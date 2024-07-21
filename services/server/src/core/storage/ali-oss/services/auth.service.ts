import { Injectable, Inject } from '@nestjs/common'
import OSS, { STS } from 'ali-oss'
import {
  OPTIONS_PROVIDER,
  ALI_OSS_CLIENT_PROVIDER,
  ALI_STS_CLIENT_PROVIDER,
} from '../constants/common.constant'
import { AliOSSModuleOptions } from '../interfaces/options.interface'

@Injectable()
export class AliOSSAuthService {
  constructor(
    @Inject(OPTIONS_PROVIDER) private readonly options: AliOSSModuleOptions,
    @Inject(ALI_OSS_CLIENT_PROVIDER) private readonly aliOSSClient: OSS,
    @Inject(ALI_STS_CLIENT_PROVIDER) private readonly aliSTSClient: STS
  ) {}

  /**
   * 获取临时访问凭证
   * @param actionList 权限列表，不传默认所有权限
   * @param resourcePath oss中文件资源路径，不传默认所有资源
   * @param expirationSeconds 凭证有效期，单位：秒，最大1小时，最小15分钟。不传默认30分钟
   * @param session 会话名称，用于标识
   * @param options 请求附加条件
   * @returns 临时访问凭证
   */
  async generateTempAK(
    actionList?: string[],
    resourcePath?: string,
    expirationSeconds?: number,
    session?: string,
    options?: any
  ): Promise<any> {
    if (!this.options.sts || !this.aliSTSClient) throw Error('未配置STS信息！')
    const resource = resourcePath
      ? this.options.bucket +
        '/' +
        resourcePath.replace(/^\//, '').replace(/\/$/, '')
      : this.options.bucket
    const policy = {
      Version: '1',
      Statement: [
        {
          Effect: 'Allow',
          Action: actionList
            ? actionList
            : ['oss:ListObjects', 'oss:GetObject', 'oss:PutObject'],
          Resource: [`acs:oss:*:*:${resource}`, `acs:oss:*:*:${resource}/*`],
        },
      ],
    }
    const { credentials } = await this.aliSTSClient.assumeRole(
      this.options.sts.roleARN,
      policy,
      expirationSeconds || 30 * 60,
      session,
      options
    )
    return credentials
  }
}
