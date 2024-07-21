import { Provider } from '@nestjs/common'
import { WECHAT_PAY_MANAGER, WECHAT_PAY_MODULE_OPTIONS } from './constants'
import { WechatPayModuleOptions } from './interface'
import { loadPackage } from './util'

/**
 * Creates a WeChatPayManager Provider.
 *
 * @publicApi
 */
export function createWechatPayManager(name?: string): Provider {
  return {
    provide: name || WECHAT_PAY_MANAGER,
    useFactory: (options: WechatPayModuleOptions) => {
      const WeChatPayManager = loadPackage(
        'wechatpay-node-v3',
        'WeChatPayModule',
        () => require('wechatpay-node-v3')
      )
      return new WeChatPayManager({
        appid: options.appid,
        mchid: options.mchid,
        publicKey: options.publicKey,
        privateKey: options.privateKey,
        ...(options.serial_no && { serial_no: options.serial_no }),
        ...(options.authType && { authType: options.authType }),
        ...(options.userAgent && { userAgent: options.userAgent }),
        ...(options.key && { key: options.key }),
      })
    },
    inject: [WECHAT_PAY_MODULE_OPTIONS],
  }
}
