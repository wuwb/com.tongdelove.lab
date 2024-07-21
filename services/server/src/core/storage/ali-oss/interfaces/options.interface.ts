import { ModuleMetadata, Type } from '@nestjs/common'

/** STS信息，用于生成临时访问信息 */
interface AliOSSModuleOptionsSTS {
  /** RAM 角色的 ARN */
  roleARN: string
  /** Access Key ID */
  accessKeyId: string
  /** Access Key Secret */
  accessKeySecret: string
}

/** 同步传入配置 */
export interface AliOSSModuleOptions {
  /** 区域名称 */
  region: string
  /** Bucket名称 */
  bucket: string
  /** Access Key ID */
  accessKeyId: string
  /** Access Key Secret */
  accessKeySecret: string
  /**
   * 资源入口
   * @description 如不指定，默认上传后返回url为http格式，想要https格式需在这里指定
   * @example https://oss-cn-hangzhou.aliyuncs.com
   */
  endpoint?: string
  /** STS 信息 */
  sts?: AliOSSModuleOptionsSTS
}

export interface AliOSSOptionsFactory {
  createMpOptions(): AliOSSModuleOptions | Promise<AliOSSModuleOptions>
}

/** 异步传入配置 */
export interface AliOSSModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<AliOSSOptionsFactory>
  useClass?: Type<AliOSSOptionsFactory>
  useFactory?: (
    ...args: any[]
  ) => AliOSSModuleOptions | Promise<AliOSSModuleOptions>
  inject?: any[]
}
