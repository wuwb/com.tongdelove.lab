# WeChat支付SDK模块 - packages/wechat/wechat-pay

## 导航

> 根目录 / [共享包](../CLAUDE.md#共享包详解) / **wechat-pay**

## 概述

**微信支付SDK** - 基于NestJS的多支付方式SDK，支持微信支付和支付宝，提供统一的支付接口

## 技术栈

- **框架**: NestJS 6.2.2, RxJS 6.5.2
- **语言**: TypeScript 5.4.5
- **构建**: ts-loader, tsconfig-paths
- **开发**: ts-node, nodemon
- **测试**: @nestjs/testing, supertest
- **安全**: Snyk安全扫描

## 目录结构

```
packages/wechat/wechat-pay/
├── src/
│   ├── modules/                  # 支付模块
│   │   ├── pay/                # 通用支付模块
│   │   │   ├── dto/            # 数据传输对象
│   │   │   │   ├── create-order.dto.ts # 创建订单DTO
│   │   │   │   ├── refund.dto.ts  # 退款DTO
│   │   │   │   └── query.dto.ts  # 查询DTO
│   │   │   ├── entities/       # 实体
│   │   │   │   ├── payment.entity.ts # 支付实体
│   │   │   │   └── refund.entity.ts # 退款实体
│   │   │   ├── controllers/    # 控制器
│   │   │   │   ├── payment.controller.ts # 支付控制器
│   │   │   │   └── refund.controller.ts # 退款控制器
│   │   │   ├── services/       # 服务
│   │   │   │   ├── payment.service.ts # 支付服务
│   │   │   │   └── refund.service.ts # 退款服务
│   │   │   ├── pay.module.ts   # 支付模块
│   │   │   └── types/         # 类型定义
│   │   │       ├── payment.types.ts # 支付类型
│   │   │       └── refund.types.ts # 退款类型
│   │   ├── wechat/            # 微信支付模块
│   │   │   ├── dto/            # DTO
│   │   │   ├── services/       # 服务
│   │   │   │   ├── wechat-pay.service.ts # 微信支付服务
│   │   │   │   ├── wechat-refund.service.ts # 微信退款服务
│   │   │   │   └── wechat-query.service.ts # 微信查询服务
│   │   │   ├── controllers/    # 控制器
│   │   │   ├── wechat-pay.controller.ts # 微信支付控制器
│   │   │   ├── wechat-pay.module.ts # 微信支付模块
│   │   │   └── types/         # 类型定义
│   │   └── alipay/            # 支付宝模块
│   │       ├── dto/
│   │       ├── services/
│   │       ├── controllers/
│   │       ├── alipay.module.ts
│   │       └── types/
│   ├── common/                 # 通用组件
│   │   ├── constants/         # 常量定义
│   │   │   ├── payment.constants.ts # 支付常量
│   │   │   ├── wechat.constants.ts # 微信常量
│   │   │   └── alipay.constants.ts # 支付宝常量
│   │   ├── decorators/        # 装饰器
│   │   ├── errors/           # 错误处理
│   │   │   ├── payment.error.ts # 支付错误
│   │   │   ├── wechat.error.ts # 微信错误
│   │   │   └── alipay.error.ts # 支付宝错误
│   │   ├── interceptors/      # 拦截器
│   │   ├── interfaces/        # 接口定义
│   │   │   ├── payment.interface.ts # 支付接口
│   │   │   ├── wechat.interface.ts # 微信接口
│   │   │   └── alipay.interface.ts # 支付宝接口
│   │   └── config/           # 配置文件
│   ├── shared/               # 共享模块
│   │   └── shared.module.ts  # 共享模块
│   ├── utils/                # 工具函数
│   │   ├── auth.util.ts      # 认证工具
│   │   ├── date.util.ts     # 日期工具
│   │   ├── random.util.ts   # 随机工具
│   │   ├── sign.util.ts    # 签名工具
│   │   ├── string.util.ts   # 字符串工具
│   │   ├── xml.util.ts     # XML工具
│   │   ├── index.ts       # 工具入口
│   │   └── pay.util.ts    # 支付工具
│   ├── index.ts            # 主入口
│   └── pay.module.ts      # 支付模块入口
├── tests/                   # 测试文件
├── dist/                    # 构建输出
├── package.json
├── tsconfig.json
├── tsconfig-paths.json
├── tsconfig.build.json
└── tslint.json
```

## 核心功能

### 1. 支付模块 (modules/pay/)

#### 支付服务 (src/modules/pay/services/payment.service.ts)
```typescript
import { Injectable } from '@nestjs/common'
import { CreateOrderDto } from '../dto/create-order.dto'
import { QueryDto } from '../dto/query.dto'

export interface PaymentResult {
  orderId: string
  paymentUrl?: string
  qrCode?: string
  codeUrl?: string // 微信支付码
  tradeState: string
  totalAmount: number
  currency: string
}

@Injectable()
export class PaymentService {
  /**
   * 创建支付订单
   */
  async createOrder(createOrderDto: CreateOrderDto): Promise<PaymentResult> {
    const { paymentMethod } = createOrderDto

    switch (paymentMethod) {
      case 'wechat':
        return this.createWechatOrder(createOrderDto)
      case 'alipay':
        return this.createAlipayOrder(createOrderDto)
      default:
        throw new Error(`Unsupported payment method: ${paymentMethod}`)
    }
  }

  /**
   * 查询支付状态
   */
  async queryOrder(queryDto: QueryDto): Promise<{
    tradeState: string
    totalAmount: number
    currency: string
    transactionId?: string
    paidAt?: Date
    message?: string
  }> {
    const { paymentMethod, orderId } = queryDto

    switch (paymentMethod) {
      case 'wechat':
        return this.queryWechatOrder(orderId)
      case 'alipay':
        return this.queryAlipayOrder(orderId)
      default:
        throw new Error(`Unsupported payment method: ${paymentMethod}`)
    }
  }

  /**
   * 关闭订单
   */
  async closeOrder(orderId: string, paymentMethod: string): Promise<void> {
    switch (paymentMethod) {
      case 'wechat':
        return this.closeWechatOrder(orderId)
      case 'alipay':
        return this.closeAlipayOrder(orderId)
      default:
        throw new Error(`Unsupported payment method: ${paymentMethod}`)
    }
  }

  /**
   * 处理微信支付回调
   */
  async handleWechatCallback(callbackData: any): Promise<void> {
    const { transaction_id, out_trade_no, result_code } = callbackData

    if (result_code === 'SUCCESS') {
      // 更新订单状态为已支付
      await this.updateOrderStatus(out_trade_no, 'PAID', {
        transactionId: transaction_id,
        paidAt: new Date(),
      })
    } else {
      // 更新订单状态为支付失败
      await this.updateOrderStatus(out_trade_no, 'FAILED', {
        message: callbackData.err_code_des || 'Payment failed',
      })
    }
  }

  /**
   * 处理支付宝回调
   */
  async handleAlipayCallback(callbackData: any): Promise<void> {
    const { trade_no, out_trade_no, trade_status } = callbackData

    if (trade_status === 'TRADE_SUCCESS' || trade_status === 'TRADE_FINISHED') {
      // 更新订单状态为已支付
      await this.updateOrderStatus(out_trade_no, 'PAID', {
        transactionId: trade_no,
        paidAt: new Date(),
      })
    } else {
      // 更新订单状态为支付失败
      await this.updateOrderStatus(out_trade_no, 'FAILED', {
        message: callbackData.msg || 'Payment failed',
      })
    }
  }

  private async createWechatOrder(createOrderDto: CreateOrderDto): Promise<PaymentResult> {
    // 实现微信支付订单创建
    // 1. 生成微信支付参数
    // 2. 调用微信支付API
    // 3. 返回支付信息
    return {
      orderId: 'wx_order_' + Date.now(),
      codeUrl: 'weixin://wxpay/bizpayurl?pr=xxx',
      tradeState: 'PENDING',
      totalAmount: createOrderDto.amount,
      currency: createOrderDto.currency,
    }
  }

  private async createAlipayOrder(createOrderDto: CreateOrderDto): Promise<PaymentResult> {
    // 实现支付宝订单创建
    return {
      orderId: 'alipay_order_' + Date.now(),
      paymentUrl: 'https://openapi.alipay.com/gateway.do?xxx',
      tradeState: 'PENDING',
      totalAmount: createOrderDto.amount,
      currency: createOrderDto.currency,
    }
  }

  private async queryWechatOrder(orderId: string): Promise<any> {
    // 实现微信订单查询
    return {
      tradeState: 'PAID',
      totalAmount: 100,
      currency: 'CNY',
      transactionId: 'wx_transaction_' + orderId,
      paidAt: new Date(),
    }
  }

  private async queryAlipayOrder(orderId: string): Promise<any> {
    // 实现支付宝订单查询
    return {
      tradeState: 'PAID',
      totalAmount: 100,
      currency: 'CNY',
      transactionId: 'alipay_transaction_' + orderId,
      paidAt: new Date(),
    }
  }

  private async closeWechatOrder(orderId: string): Promise<void> {
    // 实现微信订单关闭
  }

  private async closeAlipayOrder(orderId: string): Promise<void> {
    // 实现支付宝订单关闭
  }

  private async updateOrderStatus(
    orderId: string,
    status: string,
    metadata: Record<string, any>
  ): Promise<void> {
    // 更新订单状态到数据库
    console.log(`Updating order ${orderId} to status ${status}`, metadata)
  }
}
```

#### DTO定义 (src/modules/pay/dto/create-order.dto.ts)
```typescript
import { IsString, IsNumber, IsOptional, IsEnum, IsObject } from 'class-validator'

export class CreateOrderDto {
  @IsString()
  orderId: string

  @IsString()
  description: string

  @IsNumber()
  amount: number

  @IsString()
  currency: string

  @IsEnum(['wechat', 'alipay'])
  paymentMethod: 'wechat' | 'alipay'

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>

  @IsOptional()
  @IsString()
  notifyUrl?: string

  @IsOptional()
  @IsString()
  returnUrl?: string

  @IsOptional()
  @IsString()
  attach?: string
}
```

### 2. 微信支付模块 (modules/wechat/)

#### 微信支付服务 (src/modules/wechat/services/wechat-pay.service.ts)
```typescript
import { Injectable } from '@nestjs/common'
import axios from 'axios'
import { createHmac } from 'crypto'
import { WeChatPayConfig } from '../types/wechat.type'

@Injectable()
export class WeChatPayService {
  constructor(private readonly config: WeChatPayConfig) {}

  /**
   * 创建统一下单
   */
  async createNativeOrder(orderData: {
    body: string
    out_trade_no: string
    total_fee: number
    spbill_create_ip: string
    notify_url: string
    product_id?: string
  }): Promise<{
    code_url: string
    prepay_id?: string
    mch_id: string
    nonce_str: string
    sign: string
  }> {
    const {
      appid,
      mch_id,
      key,
      cert_serial_no,
      private_key_path,
    } = this.config

    // 构建请求参数
    const params = {
      appid,
      mch_id,
      nonce_str: this.generateNonceStr(32),
      body: orderData.body,
      out_trade_no: orderData.out_trade_no,
      total_fee: orderData.total_fee,
      spbill_create_ip: orderData.spbill_create_ip,
      notify_url: orderData.notify_url,
      trade_type: 'NATIVE',
      ...(orderData.product_id && { product_id: orderData.product_id }),
    }

    // 生成签名
    const sign = this.generateSign(params, key)

    // 构建XML
    const xml = this.buildXml({ ...params, sign })

    // 发送请求
    const response = await this.request('https://api.mch.weixin.qq.com/pay/unifiedorder', xml)

    return response
  }

  /**
   * 创建JSAPI订单（小程序支付）
   */
  async createJsapiOrder(orderData: {
    body: string
    out_trade_no: string
    total_fee: number
    spbill_create_ip: string
    notify_url: string
    openid: string
  }): Promise<{
    prepay_id: string
    code_url?: string
  }> {
    const { appid, mch_id, key } = this.config

    const params = {
      appid,
      mch_id,
      nonce_str: this.generateNonceStr(32),
      body: orderData.body,
      out_trade_no: orderData.out_trade_no,
      total_fee: orderData.total_fee,
      spbill_create_ip: orderData.spbill_create_ip,
      notify_url: orderData.notify_url,
      trade_type: 'JSAPI',
      openid: orderData.openid,
    }

    const sign = this.generateSign(params, key)
    const xml = this.buildXml({ ...params, sign })

    const response = await this.request('https://api.mch.weixin.qq.com/pay/unifiedorder', xml)

    return response
  }

  /**
   * 查询订单
   */
  async queryOrder(outTradeNo: string): Promise<{
    trade_state: string
    transaction_id?: string
    trade_state_desc?: string
  }> {
    const { appid, mch_id, key } = this.config

    const params = {
      appid,
      mch_id,
      nonce_str: this.generateNonceStr(32),
      out_trade_no: outTradeNo,
    }

    const sign = this.generateSign(params, key)
    const xml = this.buildXml({ ...params, sign })

    const response = await this.request('https://api.mch.weixin.qq.com/pay/orderquery', xml)

    return response
  }

  /**
   * 申请退款
   */
  async refundOrder(refundData: {
    out_trade_no: string
    out_refund_no: string
    total_fee: number
    refund_fee: number
    refund_desc?: string
  }): Promise<{
    refund_id: string
    out_refund_no: string
  }> {
    const { appid, mch_id, key } = this.config

    const params = {
      appid,
      mch_id,
      nonce_str: this.generateNonceStr(32),
      out_trade_no: refundData.out_trade_no,
      out_refund_no: refundData.out_refund_no,
      total_fee: refundData.total_fee,
      refund_fee: refundData.refund_fee,
      ...(refundData.refund_desc && { refund_desc: refundData.refund_desc }),
    }

    const sign = this.generateSign(params, key)
    const xml = this.buildXml({ ...params, sign })

    const response = await this.request(
      'https://api.mch.weixin.qq.com/secapi/pay/refund',
      xml
    )

    return response
  }

  /**
   * 生成支付签名
   */
  generateSign(params: Record<string, any>, key: string): string {
    // 1. 参数排序
    const sortedKeys = Object.keys(params).sort()

    // 2. 拼接参数
    const paramString = sortedKeys
      .map((k) => `${k}=${params[k]}`)
      .join('&')

    // 3. 拼接key
    const stringSignTemp = `${paramString}&key=${key}`

    // 4. MD5签名
    const sign = createHmac('md5', key)
      .update(stringSignTemp, 'utf8')
      .digest('hex')

    // 5. 转换为大写
    return sign.toUpperCase()
  }

  /**
   * 验证回调签名
   */
  verifyCallbackSign(params: Record<string, any>, sign: string): boolean {
    const calculatedSign = this.generateSign(params, this.config.key)
    return calculatedSign === sign
  }

  /**
   * 生成随机字符串
   */
  private generateNonceStr(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  /**
   * 构建XML
   */
  private buildXml(params: Record<string, any>): string {
    const xmlItems = Object.entries(params)
      .map(([key, value]) => `<${key}><![CDATA[${value}]]></${key}>`)
      .join('')

    return `<xml>${xmlItems}</xml>`
  }

  /**
   * 发送HTTP请求
   */
  private async request(url: string, xml: string): Promise<any> {
    const response = await axios.post(url, xml, {
      headers: { 'Content-Type': 'text/xml' },
      timeout: 10000,
    })

    // 解析XML响应
    // ... 实现XML解析逻辑
    return response.data
  }
}
```

### 3. 工具函数 (utils/)

#### 签名工具 (src/utils/sign.util.ts)
```typescript
import { createHmac, createHash } from 'crypto'

export class SignUtil {
  /**
   * MD5签名
   */
  static md5(str: string, key?: string): string {
    if (key) {
      return createHmac('md5', key).update(str).digest('hex').toUpperCase()
    } else {
      return createHash('md5').update(str).digest('hex').toUpperCase()
    }
  }

  /**
   * SHA1签名
   */
  static sha1(str: string): string {
    return createHash('sha1').update(str).digest('hex')
  }

  /**
   * SHA256签名
   */
  static sha256(str: string): string {
    return createHash('sha256').update(str).digest('hex')
  }

  /**
   * 微信支付签名
   */
  static wechatSign(params: Record<string, any>, key: string): string {
    const sortedKeys = Object.keys(params).sort()
    const paramString = sortedKeys
      .map((k) => `${k}=${params[k]}`)
      .join('&')
    const stringSignTemp = `${paramString}&key=${key}`
    return SignUtil.md5(stringSignTemp)
  }

  /**
   * 支付宝签名（RSA2）
   */
  static alipaySign(
    params: Record<string, any>,
    privateKey: string,
    signType: 'RSA2' | 'RSA' = 'RSA2'
  ): string {
    // 实现支付宝RSA签名逻辑
    // ... 使用crypto模块进行RSA签名
    return 'signed_value'
  }

  /**
   * 验证签名
   */
  static verifySign(
    sign: string,
    params: Record<string, any>,
    key: string,
    algorithm: 'md5' | 'sha1' | 'sha256' = 'md5'
  ): boolean {
    const calculatedSign = SignUtil.calculateSign(params, key, algorithm)
    return calculatedSign === sign
  }

  /**
   * 计算签名
   */
  static calculateSign(
    params: Record<string, any>,
    key: string,
    algorithm: 'md5' | 'sha1' | 'sha256' = 'md5'
  ): string {
    switch (algorithm) {
      case 'md5':
        return SignUtil.md5(JSON.stringify(params), key)
      case 'sha1':
        return SignUtil.sha1(JSON.stringify(params))
      case 'sha256':
        return SignUtil.sha256(JSON.stringify(params))
      default:
        throw new Error(`Unsupported algorithm: ${algorithm}`)
    }
  }
}
```

#### XML工具 (src/utils/xml.util.ts)
```typescript
import { parseString, Builder } from 'xml2js'

export class XmlUtil {
  /**
   * 解析XML为对象
   */
  static async parse(xml: string): Promise<any> {
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
   * 构建XML字符串
   */
  static build(obj: any): string {
    const builder = new Builder({ cdata: true })
    return builder.buildObject(obj)
  }

  /**
   * 提取CDATA内容
   */
  static extractCDATA(xml: string): string {
    const match = xml.match(/<!\[CDATA\[(.*?)\]\]>/s)
    return match ? match[1] : xml
  }

  /**
   * 添加CDATA标签
   */
  static addCDATA(content: string): string {
    return `<![CDATA[${content}]]>`
  }

  /**
   * 处理微信XML回调数据
   */
  static processWeixinXml(xmlData: any): Record<string, any> {
    const processed: Record<string, any> = {}
    Object.keys(xmlData).forEach((key) => {
      let value = xmlData[key]
      if (typeof value === 'string' && value.includes('<![CDATA[')) {
        value = XmlUtil.extractCDATA(value)
      }
      processed[key] = value
    })
    return processed
  }

  /**
   * 构建微信支付XML响应
   */
  static buildWeixinResponse(params: Record<string, any>): string {
    const xmlParams: Record<string, any> = {}
    Object.keys(params).forEach((key) => {
      xmlParams[key] = { _cdata: params[key] }
    })
    return XmlUtil.build({ xml: xmlParams })
  }
}
```

#### 认证工具 (src/utils/auth.util.ts)
```typescript
import { createHmac } from 'crypto'

export class AuthUtil {
  /**
   * 生成时间戳
   */
  static generateTimestamp(): number {
    return Math.floor(Date.now() / 1000)
  }

  /**
   * 生成随机字符串
   */
  static generateNonceStr(length: number = 32): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  /**
   * Base64编码
   */
  static base64Encode(data: string): string {
    return Buffer.from(data, 'utf8').toString('base64')
  }

  /**
   * Base64解码
   */
  static base64Decode(data: string): string {
    return Buffer.from(data, 'base64').toString('utf8')
  }

  /**
   * 生成访问令牌
   */
  static generateAccessToken(clientId: string, clientSecret: string, expiresIn: number): {
    access_token: string
    token_type: string
    expires_in: number
  } {
    const now = Math.floor(Date.now() / 1000)
    const payload = {
      client_id: clientId,
      iat: now,
      exp: now + expiresIn,
    }

    // 这里应该使用JWT库生成token
    // 简化实现
    const access_token = Buffer.from(JSON.stringify(payload)).toString('base64')

    return {
      access_token,
      token_type: 'Bearer',
      expires_in: expiresIn,
    }
  }

  /**
   * 验证访问令牌
   */
  static verifyAccessToken(token: string): any {
    try {
      const payload = Buffer.from(token, 'base64').toString('utf8')
      const data = JSON.parse(payload)
      const now = Math.floor(Date.now() / 1000)

      if (data.exp && data.exp < now) {
        throw new Error('Token expired')
      }

      return data
    } catch (error) {
      throw new Error('Invalid token')
    }
  }
}
```

## 配置管理

### 支付配置 (src/common/config/payment.config.ts)
```typescript
export interface PaymentConfig {
  // 微信支付配置
  wechat?: WeChatPayConfig

  // 支付宝配置
  alipay?: AlipayConfig

  // 通用配置
  common?: CommonConfig
}

export interface WeChatPayConfig {
  appid: string
  mch_id: string
  key: string
  cert_serial_no?: string
  private_key_path?: string
  public_key_path?: string
  notify_url?: string
  return_url?: string
}

export interface AlipayConfig {
  app_id: string
  private_key: string
  public_key: string
  alipay_public_key: string
  notify_url?: string
  return_url?: string
  sign_type: 'RSA2' | 'RSA'
  charset: 'utf-8' | 'gbk'
  gateway: string
}

export interface CommonConfig {
  timeout: number
  retry_times: number
  sandbox_mode: boolean
}
```

### 常量定义 (src/common/constants/payment.constants.ts)
```typescript
export const PAYMENT_CONSTANTS = {
  // 支付状态
  PAYMENT_STATUS: {
    PENDING: 'PENDING',
    PAID: 'PAID',
    FAILED: 'FAILED',
    CANCELLED: 'CANCELLED',
    REFUNDED: 'REFUNDED',
    PARTIAL_REFUND: 'PARTIAL_REFUND',
  },

  // 支付方式
  PAYMENT_METHOD: {
    WECHAT: 'wechat',
    ALIPAY: 'alipay',
  },

  // 货币类型
  CURRENCY: {
    CNY: 'CNY',
    USD: 'USD',
    EUR: 'EUR',
  },

  // 微信交易类型
  WECHAT_TRADE_TYPE: {
    JSAPI: 'JSAPI',
    NATIVE: 'NATIVE',
    APP: 'APP',
    H5: 'H5',
  },

  // 微信支付场景
  WECHAT_SCENARIO: {
    NATIVE: 'NATIVE',
    PRODUCT_ID: 'PRODUCT_ID',
  },

  // 签名算法
  SIGN_ALGORITHM: {
    MD5: 'md5',
    SHA1: 'sha1',
    SHA256: 'sha256',
  },
} as const

export const ERROR_MESSAGES = {
  INVALID_CONFIG: 'Invalid payment configuration',
  ORDER_NOT_FOUND: 'Order not found',
  PAYMENT_FAILED: 'Payment failed',
  REFUND_FAILED: 'Refund failed',
  SIGNATURE_INVALID: 'Invalid signature',
  AMOUNT_MISMATCH: 'Amount mismatch',
  CURRENCY_NOT_SUPPORTED: 'Currency not supported',
} as const
```

## 依赖详情

### 核心依赖
```json
{
  "@nestjs/common": "^6.2.2",              // NestJS核心
  "reflect-metadata": "^0.1.12",           // 反射元数据
  "rxjs": "^6.5.2",                       // 响应式编程
  "snyk": "^1.266.0"                     // 安全扫描
}
```

### 开发依赖
```json
{
  "@nestjs/testing": "^6.2.2",             // 测试工具
  "@types/express": "^4.17.17",              // Express类型
  "@types/node": "^20.12.8",                // Node类型
  "@types/supertest": "2.0.7",             // 测试类型
  "nodemon": "1.19.0",                      // 开发监控
  "supertest": "4.0.2",                     // HTTP测试
  "ts-loader": "6.0.1",                     // TypeScript加载器
  "tsconfig-paths": "3.8.0",                // 路径映射
  "tslint": "^5.12.0",                     // 代码检查
  "typescript": "^5.4.5"                     // TypeScript
}
```

## 开发命令

```bash
# 构建
pnpm build                                   # TypeScript编译

# 开发
pnpm start                                   # 启动应用
pnpm start:dev                               # 开发模式（nodemon）
pnpm start:debug                             # 调试模式
pnpm prestart:prod                           # 生产构建
pnpm start:prod                              # 生产启动

# 代码质量
pnpm lint                                    // TSLint检查
pnpm format                                  // Prettier格式化

# 安全
pnpm snyk-protect                           // Snyk保护
pnpm prepublish                              // 发布前准备
```

## 使用示例

### 1. 在应用中集成支付模块

```typescript
import { PayModule } from '@tongdelove/wechat-pay'
import { Module } from '@nestjs/common'

@Module({
  imports: [
    PayModule.forRoot({
      wechatConfig: {
        appid: process.env.WECHAT_APP_ID,
        mch_id: process.env.WECHAT_MCH_ID,
        key: process.env.WECHAT_PAY_KEY,
        notify_url: 'https://your-domain.com/payment/wechat/notify',
      },
      alipayConfig: {
        app_id: process.env.ALIPAY_APP_ID,
        private_key: process.env.ALIPAY_PRIVATE_KEY,
        public_key: process.env.ALIPAY_PUBLIC_KEY,
        alipay_public_key: process.env.ALIPAY_PUBLIC_KEY,
        notify_url: 'https://your-domain.com/payment/alipay/notify',
      },
    }),
  ],
})
export class AppModule {}
```

### 2. 创建支付订单

```typescript
import { Injectable } from '@nestjs/common'
import { PaymentService } from '@tongdelove/wechat-pay'

@Injectable()
export class OrderService {
  constructor(private readonly paymentService: PaymentService) {}

  async createPayment(orderId: string, amount: number) {
    const paymentResult = await this.paymentService.createOrder({
      orderId,
      amount,
      currency: 'CNY',
      paymentMethod: 'wechat',
      description: '商品购买',
      notifyUrl: 'https://your-domain.com/payment/notify',
    })

    return paymentResult
  }
}
```

### 3. 处理支付回调

```typescript
import { Controller, Post, Body } from '@nestjs/common'
import { PaymentService } from '@tongdelove/wechat-pay'

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('wechat/notify')
  async handleWechatNotify(@Body() callbackData: any) {
    await this.paymentService.handleWechatCallback(callbackData)
    return { code: 'SUCCESS', message: 'OK' }
  }

  @Post('alipay/notify')
  async handleAlipayNotify(@Body() callbackData: any) {
    await this.paymentService.handleAlipayCallback(callbackData)
    return 'success'
  }
}
```

## 环境变量

### 微信支付配置
```bash
# 微信支付
WECHAT_APP_ID=your_app_id
WECHAT_MCH_ID=your_mch_id
WECHAT_PAY_KEY=your_pay_key
WECHAT_CERT_SERIAL_NO=your_cert_serial_no
WECHAT_PRIVATE_KEY_PATH=/path/to/private_key.pem
WECHAT_PUBLIC_KEY_PATH=/path/to/public_key.pem

# 支付宝
ALIPAY_APP_ID=your_app_id
ALIPAY_PRIVATE_KEY=your_private_key
ALIPAY_PUBLIC_KEY=your_public_key
ALIPAY_ALIPAY_PUBLIC_KEY=alipay_public_key
```

## 最佳实践

### 1. 安全考虑
- 使用HTTPS加密传输
- 验证所有回调请求签名
- 定期轮换API密钥
- 实施访问控制

### 2. 错误处理
- 捕获支付API异常
- 重试机制处理临时失败
- 记录详细日志
- 优雅降级

### 3. 订单管理
- 防止重复支付
- 实现订单超时机制
- 记录完整交易日志
- 定期对账

### 4. 测试策略
- 单元测试覆盖核心逻辑
- 集成测试验证支付流程
- 沙箱环境测试
- 模拟回调测试

## 常见问题

### Q: 如何处理支付回调验签失败？
A:
```typescript
if (!this.wechatPayService.verifyCallbackSign(params, sign)) {
  throw new UnauthorizedException('Invalid signature')
}
```

### Q: 如何实现支付状态轮询？
A:
```typescript
const pollPaymentStatus = async (orderId: string, maxAttempts: number = 10) => {
  for (let i = 0; i < maxAttempts; i++) {
    const status = await this.paymentService.queryOrder(orderId)
    if (status.tradeState === 'PAID') {
      return status
    }
    await new Promise(resolve => setTimeout(resolve, 2000))
  }
  throw new Error('Payment timeout')
}
```

### Q: 如何处理退款申请？
A:
```typescript
const refundOrder = async (orderId: string, refundAmount: number) => {
  const refundData = {
    out_trade_no: orderId,
    out_refund_no: 'refund_' + Date.now(),
    total_fee: originalAmount,
    refund_fee: refundAmount,
  }

  return await this.paymentService.refundOrder(refundData)
}
```

## 相关资源

- [微信支付文档](https://pay.weixin.qq.com/wiki/doc/apiv3/apis/index.shtml)
- [支付宝开放平台](https://open.alipay.com/)
- [NestJS文档](https://docs.nestjs.com/)

---

*最后更新: 2025-11-02*
