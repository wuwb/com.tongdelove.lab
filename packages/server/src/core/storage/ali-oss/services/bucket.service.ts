import { Injectable, Inject } from "@nestjs/common";
import AliOSS, { Bucket } from "ali-oss";
import { OPTIONS_PROVIDER, ALI_OSS_CLIENT_PROVIDER } from "../constants/common.constant";

@Injectable()
export class AliOSSBucketService {
  constructor(
    @Inject(OPTIONS_PROVIDER) private options: any,
    @Inject(ALI_OSS_CLIENT_PROVIDER) private aliOSSClient: AliOSS
  ) {}

  /**
   * 获取bucket信息
   * @returns bucket信息
   */
  async getInfo(): Promise<Bucket> {
    return this.aliOSSClient.getBucketInfo(this.options.bucket);
  }

  /**
   * 获取bucket location信息
   * @returns bucket location信息
   */
  async getLocation(): Promise<string> {
    return this.aliOSSClient.getBucketLocation(this.options.bucket);
  }

  /**
   * 获取bucket ACL信息
   * @param options 请求附加参数
   * @returns ACL信息
   */
  async getACL(options?: any): Promise<string> {
    return this.aliOSSClient.getBucketACL(this.options.bucket, options);
  }
}
