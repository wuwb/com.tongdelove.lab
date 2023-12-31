import { Injectable, Inject } from '@nestjs/common';
import OSS from 'ali-oss';
import { ALI_OSS_CLIENT_PROVIDER } from '../constants/common.constant';

@Injectable()
export class AliOSSService {
  constructor(@Inject(ALI_OSS_CLIENT_PROVIDER) private readonly aliOSSClient: OSS) {}

  /**
   * put方式上传文件到OSS上
   * @param remotePath OSS远端路径
   * @param localPath 文件本地路径
   * @param options 上传参数
   * @returns 上传结果
   */
  async putUpload(remotePath: string, localPath: string, options?: OSS.PutObjectOptions): Promise<OSS.PutObjectResult> {
    return this.aliOSSClient.put(remotePath, localPath, options);
  }

  /**
   * 拷贝文件（相同bucket）
   * @param source 拷贝源
   * @param target 目标地址
   * @param options 拷贝参数
   * @returns 拷贝结果
   */
  async copy(source: string, target: string, options?: OSS.CopyObjectOptions): Promise<boolean> {
    const { res } = await this.aliOSSClient.copy(target, source, options);
    return res.status === 200;
  }

  /**
   * 移动文件
   * @param source 源文件地址
   * @param target 目标地址
   * @returns 移动结果
   */
  async move(source: string, target: string): Promise<boolean> {
    const copyResult = await this.copy(source, target);
    if (!copyResult) return false;
    await this.delete(source);
    return true;
  }

  /**
   * 删除oss中文件
   * @description 删除方法无论是否有这个oss文件，都会返回204状态码，也只有这个信息是有用的，所以此方法无返回值。
   * @param remotePath oss中文件路径
   * @param options 删除参数
   */
  async delete(remotePath: string, options?: OSS.DeleteObjectOptions): Promise<void> {
    if (!(await this.fileExist(remotePath))) throw `文件${remotePath}不存在`;
    this.aliOSSClient.delete(remotePath, options);
  }

  /**
   * 检测文件是否存在
   * @param remotePath oss中文件路径
   * @param options 附加参数
   * @returns 检验结果
   */
  async fileExist(remotePath: string, options?: OSS.HeadObjectOptions): Promise<boolean> {
    try {
      await this.aliOSSClient.head(remotePath, options);
      return true;
    } catch (error: any) {
      if (error.code === 'NoSuchKey') return false;
      throw error;
    }
  }
}
