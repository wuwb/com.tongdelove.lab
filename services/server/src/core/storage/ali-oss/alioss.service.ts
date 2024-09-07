import { Injectable } from '@nestjs/common'
import * as OSS from 'ali-oss'
import * as stream from 'stream'
import { ConfigService } from '@nestjs/config'
import * as mime from 'mime'
import dayjs from 'dayjs'
import { base64Encode, hmacSHA1 } from '@tongdelove/utils'
import axios from 'axios'

const STS = (OSS as any).STS

export interface IUpToken {
  AccessKeyId: string
  AccessKeySecret: string
  SecurityToken: string
  Expiration: string
}

const PassThrough = stream.PassThrough

@Injectable()
export class AliossService {
  private sts: typeof STS

  constructor(private readonly configService: ConfigService) {
    this.sts = new STS({
      accessKeyId: configService.get('ALIYUN_CLOUD_STORAGE.accessKey'),
      accessKeySecret: configService.get('ALIYUN_CLOUD_STORAGE.secretKey'),
    })
  }

  private createClient() {
    const client = new OSS({
      region: this.configService.get('alioss.region'),
      accessKeyId: this.configService.get('alioss.accessKeyID'),
      accessKeySecret: this.configService.get('alioss.accessKeySecret'),
      bucket: this.configService.get('alioss.bucket'),
    })
    return client
  }

  // 获取临时 Token
  public async getToken(): Promise<IUpToken> {
    const response = await this.sts.assumeRole(
      this.configService.get('ALIYUN_CLOUD_STORAGE.aliyunAcsARN'),
      null,
      15 * 60,
      'session-name'
    )
    return response.credentials
  }

  // 上传文件
  public async uploadFile(
    name: string,
    file: any,
    region: string,
    bucket: string
  ) {
    return this.getToken().then((token) => {
      let client = new OSS({
        region,
        bucket,
        accessKeyId: token.AccessKeyId,
        accessKeySecret: token.AccessKeySecret,
        stsToken: token.SecurityToken,
        secure: true,
      })
      return client.put(name, file).finally(() => {
        client = null
      })
    })
  }

  private createOSSClient() {
    const client = new OSS({
      region: this.configService.get('aliyunOSS.region'),
      accessKeyId: this.configService.get('aliyunOSS.accessKeyID'),
      accessKeySecret: this.configService.get('aliyunOSS.accessKeySecret'),
      bucket: this.configService.get('aliyunOSS.bucket'),
    })
    return client
  }

  async requestPolicy() {
    const now = dayjs()
    const aliyun = this.configService.get('aliyunOSS')
    const staticConfig = this.configService.get('static')
    const imgMaxSizeM = staticConfig.imgMaxSize
    const policy = {
      // 设置Policy的失效时间, 以ISO8601 GMT时间表示
      // 超过失效时间，就无法通过此Policy上传文件
      expiration: dayjs().add(aliyun.expiration, 'hours').toISOString(),
      conditions: [
        { bucket: aliyun.bucket },
        ['starts-with', '$key', aliyun.uploadPrefix],
        ['content-length-range', 1, imgMaxSizeM], // 设置上传文件的大小限制, 单位字节
      ],
    }

    const base64Policy = base64Encode(JSON.stringify(policy))
    const signature = hmacSHA1(aliyun.accessKeySecret, base64Policy)
    const domain = this.configService.get('server.domain')
    const callbackObj = {
      callbackUrl: `https://${domain}api/common/oss/callback`,
      callbackBody:
        '{' +
        [
          '"mimeType":${mimeType}',
          '"size":${size}',
          '"filename":${object}',
          '"width":${imageInfo.width}',
          '"height":${imageInfo.height}',
          '"format":${imageInfo.format}',
          '"callback-token":${x:callback-token}',
        ].join(',') +
        '}',
      callbackBodyType: 'application/json',
    }
    const isDev =
      this.configService.get('env') === this.configService.get('DEVELOPMENT')
    return {
      uploadActionURL: aliyun.uploadActionURL,
      uploadFieldName: aliyun.uploadFieldName,
      uploadPrefix:
        aliyun.uploadPrefix + '/' + now.year() + '/' + (now.month() + 1),
      imgFormat: staticConfig.imgFormat,
      imgMaxSize: staticConfig.imgMaxSize,
      imgMaxSizeError: staticConfig.imgMaxSizeError,
      uploadData: {
        OSSAccessKeyId: aliyun.accessKeyID,
        policy: base64Policy,
        Signature: signature,
        key: '', // 上传文件的object名称
        success_action_status: 201,
        callback: !isDev
          ? base64Encode(JSON.stringify(callbackObj))
          : undefined,
        'x:callback-token': !isDev
          ? this.configService.get('aliyunOSS.callbackSecretToken')
          : undefined,
      },
      uploadImgURL: staticConfig.uploadImgURL,
    }
  }

  async uploadFromStreamURL(url: string, pathname: string): Promise<string> {
    const client = new OSS({
      region: this.configService.get('aliyunOSS.region'),
      accessKeyId: this.configService.get('aliyunOSS.accessKeyID'),
      accessKeySecret: this.configService.get('aliyunOSS.accessKeySecret'),
      bucket: this.configService.get('aliyunOSS.bucket'),
    })
    const res = await axios({
      method: 'get',
      url,
      responseType: 'stream',
    })
    const uploadName = `${this.configService.get('aliyunOSS.uploadPrefix')}${pathname}`
    const result = await client.putStream(
      uploadName,
      res.data.pipe(new PassThrough())
    )
    let name = result.name || ''
    if (name.charAt(0) !== '/') {
      name = '/' + name
    }
    return this.configService.get('static.uploadImgURL') + name
  }

  getImageURL(path: string) {
    if (path.indexOf('https://') === 0) {
      return path
    }
    if (path.charAt(0) !== '/') {
      path = '/' + path
    }
    return this.configService.get('static.uploadImgURL') + path
  }

  async getImageInfo(path: string) {
    if (path.charAt(0) !== '/') {
      path = '/' + path
    }
    const client = this.createOSSClient()
    let result
    try {
      result = await client.get(path, { process: 'image/info' })
    } catch (err) {
      console.log(err)
      return null
    }
    const imgData = JSON.parse(result.content.toString())
    return {
      mime: mime.getType(imgData.Format.value),
      size: parseInt(imgData.FileSize.value, 10),
      url: path,
      width: parseInt(imgData.ImageWidth.value, 10),
      height: parseInt(imgData.ImageHeight.value, 10),
      format: imgData.Format.value,
    }
  }

  async createImage(imgData) {
    const img: any = new Image()
    img.format = imgData.format
    img.mime = imgData.mime
    img.width = imgData.width
    img.height = imgData.height
    img.size = imgData.size
    img.url = imgData.url
    // return await this.imageRepository.save(img);
  }

  async findImages(ids: number[]) {
    // return await this.imageRepository.find({
    //     where: {
    //         id: In(ids),
    //     },
    // });
  }
}
