# WeChat支付提供商模块 - packages/wechat/wechat-pay-provider

## 导航

> 根目录 / [共享包](../CLAUDE.md#共享包详解) / **wechat-pay-provider**

## 概述

**微信支付提供商** - 微信支付通道的NestJS提供程序实现，封装支付接口和回调处理

## 技术栈

- **框架**: 参考 @iot9.com/nestjs-wechat-pay-provider
- **用途**: 支付通道适配器
- **集成**: 与 @tongdelove/wechat-pay 配合使用

## 当前状态

**状态**: 空模块
**目录**: 仅有README.md
**功能**: 作为支付通道的参考实现

## 预期目录结构

```
packages/wechat/wechat-pay-provider/
├── src/
│   ├── interfaces/              # 接口定义
│   │   ├── payment.interface.ts # 支付接口
│   │   ├── refund.interface.ts # 退款接口
│   │   └── callback.interface.ts # 回调接口
│   ├── providers/            # 提供商实现
│   │   ├── wechat.provider.ts # 微信支付提供器
│   │   ├── alipay.provider.ts # 支付宝提供器
│   │   └── base.provider.ts # 基础提供器
│   ├── decorators/           # 装饰器
│   │   ├── pay.decorator.ts # 支付装饰器
│   │   └── refund.decorator.ts # 退款装饰器
│   ├── interceptors/       # 拦截器
│   │   ├── pay.interceptor.ts # 支付拦截器
│   │   └── callback.interceptor.ts # 回调拦截器
│   ├── utils/            # 工具函数
│   │   ├── signature.util.ts # 签名工具
│   │   ├── crypto.util.ts  # 加密工具
│   │   └── xml.util.ts   # XML工具
│   ├── constants/        # 常量定义
│   │   ├── payment.constants.ts # 支付常量
│   │   └── provider.constants.ts # 提供商常量
│   ├── index.ts         # 主入口
│   └── provider.module.ts # 提供商模块
├── tests/              # 测试文件
├── package.json
└── README.md
```

## 预期功能

### 1. 支付提供器接口
```typescript
export interface IPaymentProvider {
  createOrder(orderData: OrderData): Promise<OrderResult>
  queryOrder(orderId: string): Promise<OrderStatus>
  refundOrder(refundData: RefundData): Promise<RefundResult>
  handleCallback(callbackData: any): Promise<CallbackResult>
  verifySignature(data: any): boolean
}
```

### 2. 支持的支付方式
- 微信支付
  - 扫码支付 (Native)
  - JSAPI支付 (小程序)
  - APP支付
  - H5支付

- 支付宝
  - 手机网站支付
  - 电脑网站支付
  - APP支付

### 3. 回调处理
```typescript
@PayCallback()
async handleWechatCallback(@CallbackData() data: WechatCallbackData) {
  const { transaction_id, out_trade_no, result_code } = data

  if (result_code === 'SUCCESS') {
    await this.paymentService.markAsPaid(out_trade_no)
    return { code: 'SUCCESS', message: 'OK' }
  }

  return { code: 'FAIL', message: 'Payment failed' }
}
```

## 接口定义

### 支付接口 (src/interfaces/payment.interface.ts)
```typescript
export interface PaymentProvider {
  /**
   * 创建支付订单
   */
  createOrder(params: CreateOrderParams): Promise<CreateOrderResult>

  /**
   * 查询支付状态
   */
  queryOrder(orderId: string): Promise<QueryOrderResult>

  /**
   * 申请退款
   */
  refundOrder(params: RefundParams): Promise<RefundResult>

  /**
   * 查询退款状态
   */
  queryRefund(refundId: string): Promise<QueryRefundResult>

  /**
   * 处理支付回调
   */
  handleCallback(callback: any): Promise<CallbackResult>

  /**
   * 验证回调签名
   */
  verifySignature(data: any, signature: string): boolean
}

export interface CreateOrderParams {
  outTradeNo: string
  subject: string
  totalAmount: number
  currency: string
  returnUrl?: string
  notifyUrl: string
  clientIp: string
  metadata?: Record<string, any>
}

export interface CreateOrderResult {
  orderId: string
  paymentUrl?: string
  qrCode?: string
  codeUrl?: string
  transactionId?: string
  status: 'PENDING' | 'SUCCESS' | 'FAILED'
}

export interface QueryOrderResult {
  orderId: string
  transactionId?: string
  status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'CANCELLED'
  paidAt?: Date
  totalAmount: number
  currency: string
}
```

### 退款接口 (src/interfaces/refund.interface.ts)
```typescript
export interface RefundProvider {
  /**
   * 申请退款
   */
  refund(params: RefundParams): Promise<RefundResult>

  /**
   * 查询退款
   */
  queryRefund(refundId: string): Promise<QueryRefundResult>
}

export interface RefundParams {
  orderId: string
  refundNo: string
  totalAmount: number
  refundAmount: number
  reason?: string
  metadata?: Record<string, any>
}

export interface RefundResult {
  refundId: string
  refundNo: string
  status: 'PENDING' | 'SUCCESS' | 'FAILED'
  refundAmount: number
  currency: string
  refundAt?: Date
}
```

## 提供商实现

### 微信支付提供器 (src/providers/wechat.provider.ts)
```typescript
@Injectable()
export class WechatPayProvider implements PaymentProvider {
  constructor(
    private config: WechatPayConfig,
    private httpService: HttpService
  ) {}

  async createOrder(params: CreateOrderParams): Promise<CreateOrderResult> {
    // 构建微信支付参数
    const wxParams = {
      appid: this.config.appId,
      mch_id: this.config.mchId,
      nonce_str: this.generateNonceStr(),
      body: params.subject,
      out_trade_no: params.outTradeNo,
      total_fee: params.totalAmount,
      spbill_create_ip: params.clientIp,
      notify_url: params.notifyUrl,
      trade_type: 'NATIVE',
    }

    // 生成签名
    const sign = this.generateSign(wxParams, this.config.key)

    // 调用微信API
    const result = await this.request('https://api.mch.weixin.qq.com/pay/unifiedorder', {
      ...wxParams,
      sign,
    })

    return {
      orderId: params.outTradeNo,
      codeUrl: result.code_url,
      status: 'PENDING',
    }
  }

  async queryOrder(orderId: string): Promise<QueryOrderResult> {
    // 实现订单查询逻辑
  }

  async refund(params: RefundParams): Promise<RefundResult> {
    // 实现退款逻辑
  }

  async handleCallback(callback: any): Promise<CallbackResult> {
    const { transaction_id, out_trade_no, result_code } = callback

    if (result_code === 'SUCCESS') {
      return {
        orderId: out_trade_no,
        transactionId: transaction_id,
        status: 'SUCCESS',
        paidAt: new Date(),
      }
    }

    throw new Error('Payment failed')
  }

  verifySignature(data: any, signature: string): boolean {
    const calculatedSign = this.generateSign(data, this.config.key)
    return calculatedSign === signature
  }
}
```

### 支付宝提供器 (src/providers/alipay.provider.ts)
```typescript
@Injectable()
export class AlipayProvider implements PaymentProvider {
  constructor(
    private config: AlipayConfig,
    private httpService: HttpService
  ) {}

  async createOrder(params: CreateOrderParams): Promise<CreateOrderResult> {
    // 构建支付宝参数
    const bizContent = {
      out_trade_no: params.outTradeNo,
      total_amount: params.totalAmount,
      subject: params.subject,
      product_code: 'FAST_INSTANT_TRADE_PAY',
    }

    const params = {
      app_id: this.config.appId,
      method: 'alipay.trade.page.pay',
      charset: 'utf-8',
      sign_type: this.config.signType,
      timestamp: this.getTimestamp(),
      version: '1.0',
      biz_content: JSON.stringify(bizContent),
    }

    const sign = this.generateSign(params, this.config.privateKey)

    const paymentUrl = `${this.config.gateway}?${this.buildQueryString({ ...params, sign })}`

    return {
      orderId: params.outTradeNo,
      paymentUrl,
      status: 'PENDING',
    }
  }
}
```

## 装饰器

### 支付装饰器 (src/decorators/pay.decorator.ts)
```typescript
/**
 * 支付回调装饰器
 */
export function PayCallback(): MethodDecorator {
  return function (target, propertyKey, descriptor) {
    // 装饰器实现
  }
}

/**
 * 支付成功装饰器
 */
export function OnPaymentSuccess(): MethodDecorator {
  return function (target, propertyKey, descriptor) {
    // 装饰器实现
  }
}
```

## 拦截器

### 支付拦截器 (src/interceptors/pay.interceptor.ts)
```typescript
@Injectable()
export class PaymentInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest()

    // 记录支付请求
    this.logger.log(`Payment request: ${request.method} ${request.url}`)

    // 验证必要参数
    this.validateParams(request.body)

    return next.handle()
  }
}
```

### 回调拦截器 (src/interceptors/callback.interceptor.ts)
```typescript
@Injectable()
export class CallbackInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest()
    const body = request.body

    // 验证签名
    if (!this.verifySignature(body)) {
      throw new UnauthorizedException('Invalid signature')
    }

    // 记录回调
    this.logger.log(`Callback received: ${JSON.stringify(body)}`)

    return next.handle()
  }
}
```

## 工具函数

### 签名工具 (src/utils/signature.util.ts)
```typescript
export class SignatureUtil {
  /**
   * 生成微信支付签名
   */
  static generateWxSign(params: Record<string, any>, key: string): string {
    const sortedKeys = Object.keys(params).sort()
    const paramString = sortedKeys
      .map((k) => `${k}=${params[k]}`)
      .join('&')

    const stringSignTemp = `${paramString}&key=${key}`
    return crypto.createHash('md5').update(stringSignTemp).digest('hex').toUpperCase()
  }

  /**
   * 生成支付宝签名
   */
  static generateAlipaySign(params: Record<string, any>, privateKey: string): string {
    const sortedKeys = Object.keys(params).sort()
    const paramString = sortedKeys
      .map((k) => `${k}=${params[k]}`)
      .join('&')

    return crypto
      .createSign('RSA-SHA256')
      .update(paramString)
      .sign(privateKey, 'base64')
  }
}
```

### XML工具 (src/utils/xml.util.ts)
```typescript
export class XmlUtil {
  /**
   * 解析XML为对象
   */
  static parse(xml: string): Promise<any> {
    return new Promise((resolve, reject) => {
      parseString(xml, { explicitArray: false }, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result.xml)
        }
      })
    })
  }

  /**
   * 构建XML响应
   */
  static buildResponse(params: Record<string, any>): string {
    const xmlItems = Object.entries(params)
      .map(([key, value]) => `<${key}><![CDATA[${value}]]></${key}>`)
      .join('')

    return `<xml>${xmlItems}</xml>`
  }
}
```

## 模块配置

### 提供商模块 (src/provider.module.ts)
```typescript
@Module({
  providers: [
    {
      provide: PaymentProvider,
      useClass: process.env.PAYMENT_PROVIDER === 'wechat'
        ? WechatPayProvider
        : AlipayProvider,
    },
  ],
  exports: [PaymentProvider],
})
export class ProviderModule {}
```

## 使用示例

### 在应用中注入支付提供商
```typescript
import { Module } from '@nestjs/common'
import { ProviderModule } from '@tongdelove/wechat-pay-provider'

@Module({
  imports: [ProviderModule],
})
export class AppModule {}
```

### 在服务中使用
```typescript
import { Injectable, Inject } from '@nestjs/common'
import { PaymentProvider } from '@tongdelove/wechat-pay-provider'

@Injectable()
export class OrderService {
  constructor(
    @Inject(PaymentProvider) private paymentProvider: PaymentProvider
  ) {}

  async createPayment(orderId: string) {
    return await this.paymentProvider.createOrder({
      outTradeNo: orderId,
      subject: 'Order Payment',
      totalAmount: 100,
      currency: 'CNY',
      notifyUrl: 'https://your-domain.com/payment/notify',
    })
  }
}
```

## 依赖配置

### package.json
```json
{
  "name": "@tongdelove/wechat-pay-provider",
  "version": "1.0.0",
  "dependencies": {
    "@nestjs/common": "^10.0.0",
    "axios": "^1.0.0",
    "xml2js": "^0.5.0"
  }
}
```

## 环境变量

```bash
# 支付提供商选择
PAYMENT_PROVIDER=wechat # 或 alipay

# 微信配置
WECHAT_APP_ID=your_app_id
WECHAT_MCH_ID=your_mch_id
WECHAT_PAY_KEY=your_pay_key

# 支付宝配置
ALIPAY_APP_ID=your_app_id
ALIPAY_PRIVATE_KEY=your_private_key
ALIPAY_PUBLIC_KEY=your_public_key
```

## 最佳实践

### 1. 安全考虑
- 验证所有回调签名
- 使用HTTPS传输
- 实施访问控制
- 敏感信息加密

### 2. 错误处理
- 捕获支付API异常
- 重试机制
- 详细日志记录
- 优雅降级

### 3. 性能优化
- 缓存支付参数
- 异步处理
- 连接池复用
- 批量操作

### 4. 监控
- 支付成功率
- 响应时间
- 错误率
- 业务指标

## 相关资源

- [@iot9x.com/nestjs-wechat-pay-provider](https://www.npmjs.com/package/@iot9x.com/nestjs-wechat-pay-provider)
- [微信支付文档](https://pay.weixin.qq.com/wiki/doc/apiv3/apis/index.shtml)
- [支付宝开放平台](https://open.alipay.com/)

---

*状态: 预实现*
*最后更新: 2025-11-02*
