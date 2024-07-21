import { ModuleMetadata, Provider, Type } from '@nestjs/common'

export interface WechatPayModuleOptions {
  /** 直连商户申请的公众号或移动应用appid。 */
  appid: string
  /** 商户号 */
  mchid: string
  /** 证书序列号 */
  serial_no?: string
  /** 公钥 */
  publicKey: Buffer
  /** 密钥 */
  privateKey: Buffer
  /** 认证类型，目前为WECHATPAY2-SHA256-RSA2048 */
  authType?: string
  /** 自定义请求头 */
  userAgent?: string
  /** v3回调key */
  key?: string
}

/**
 * Interface describing a `WechatPayOptionsFactory`.  Providers supplying configuration
 * options for the WechatPay module must implement this interface.
 * @publicApi
 */
export interface WechatPayOptionsFactory {
  createWechatPayOptions():
    | Promise<WechatPayModuleOptions>
    | WechatPayModuleOptions
}

/**
 * Options for dynamically configuring the WechatPay module.
 * @publicApi
 */
export interface WechatPayModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  name?: string
  /**
   * Injection token resolving to an existing provider. The provider must implement
   * the `WechatPayOptionsFactory` interface.
   */
  useExisting?: Type<WechatPayOptionsFactory>
  /**
   * Injection token resolving to a class that will be instantiated as a provider.
   * The class must implement the `WechatPayOptionsFactory` interface.
   */
  useClass?: Type<WechatPayOptionsFactory>
  /**
   * Function returning options (or a Promise resolving to options) to configure the
   * cache module.
   */
  useFactory?: (
    ...args: any[]
  ) => Promise<WechatPayModuleOptions> | WechatPayModuleOptions
  /**
   * Dependencies that a Factory may inject.
   */
  inject?: any[]
  extraProviders?: Provider[]
}
