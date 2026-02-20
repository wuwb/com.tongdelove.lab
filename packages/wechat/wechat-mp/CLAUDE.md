# WeChat小程序模块 - packages/wechat/wechat-mp

## 导航

> 根目录 / [共享包](../CLAUDE.md#共享包详解) / **wechat-mp**

## 概述

**微信小程序SDK** - 基于NestJS的微信小程序开发工具包，提供小程序API封装和业务集成

## 技术栈

- **框架**: NestJS 6.2.2, RxJS 6.5.2
- **语言**: TypeScript 5.4.5
- **构建**: ts-loader, tslint
- **开发**: nodemon, ts-node
- **测试**: @nestjs/testing, supertest
- **安全**: Snyk安全扫描

## 目录结构

```
packages/wechat/wechat-mp/
├── src/
│   ├── auth/                   # 小程序登录认证
│   │   ├── auth.controller.ts  # 认证控制器
│   │   ├── auth.service.ts    # 认证服务
│   │   ├── auth.module.ts     # 认证模块
│   │   └── strategies/        # 认证策略
│   │       ├── wxlogin.strategy.ts # 微信登录策略
│   │       └── jwt.strategy.ts     # JWT策略
│   ├── api/                   # 小程序API
│   │   ├── api.controller.ts # API控制器
│   │   ├── api.service.ts    # API服务
│   │   └── api.module.ts     # API模块
│   ├── message/               # 消息处理
│   │   ├── message.controller.ts # 消息控制器
│   │   ├── message.service.ts # 消息服务
│   │   └── templates/        # 消息模板
│   ├── components/            # 小程序组件
│   │   ├── component.service.ts # 组件服务
│   │   └── component.controller.ts # 组件控制器
│   ├── plugins/              # 插件管理
│   │   ├── plugin.service.ts # 插件服务
│   │   └── plugin.controller.ts # 插件控制器
│   ├── user/                 # 用户管理
│   │   ├── user.controller.ts # 用户控制器
│   │   ├── user.service.ts  # 用户服务
│   │   └── user.module.ts   # 用户模块
│   ├── config/               # 配置文件
│   │   ├── wx.config.ts     # 微信配置
│   │   ├── mp.config.ts     # 小程序配置
│   │   └── constants.ts     # 常量定义
│   ├── utils/                # 工具函数
│   │   ├── crypto.utils.ts  # 加密工具
│   │   ├── signature.utils.ts # 签名工具
│   │   └── request.utils.ts  # 请求工具
│   ├── main.ts              # 应用入口
│   └── app.module.ts        # 根模块
├── tests/                    # 测试文件
├── dist/                     # 构建输出
├── package.json
├── tsconfig.json
├── tsconfig-paths.json
├── tsconfig.build.json
├── tslint.json
└── snyk-protect
```

## 核心功能

### 1. 小程序登录认证 (auth/)

#### 认证控制器 (src/auth/auth.controller.ts)
```typescript
import { Controller, Post, Body, Get, Req, Res, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard'
import { WxLoginGuard } from '../common/guards/wx-login.guard'
import { Request, Response } from 'express'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * 微信登录
   * @param loginDto 登录参数 { code: string, userInfo?: object }
   */
  @Post('wx-login')
  async wxLogin(@Body() loginDto: { code: string; userInfo?: object }) {
    return this.authService.wxLogin(loginDto)
  }

  /**
   * 获取用户信息
   */
  @Get('user-info')
  @UseGuards(JwtAuthGuard)
  async getUserInfo(@Req() req: Request) {
    const userId = req.user.userId
    return this.authService.getUserInfo(userId)
  }

  /**
   * 刷新token
   */
  @Post('refresh')
  async refreshToken(@Body() refreshTokenDto: { refreshToken: string }) {
    return this.authService.refreshToken(refreshTokenDto.refreshToken)
  }

  /**
   * 微信小程序授权登录
   */
  @Post('login')
  @UseGuards(WxLoginGuard)
  async login(@Req() req: Request) {
    const { userId, openId } = req.user
    return this.authService.login(userId, openId)
  }
}
```

#### 认证服务 (src/auth/auth.service.ts)
```typescript
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { WxApiService } from '../api/wx-api.service'

export interface WxLoginResult {
  openid: string
  session_key: string
  unionid?: string
}

export interface AuthResult {
  accessToken: string
  refreshToken: string
  expiresIn: number
  user: {
    id: string
    openId: string
    nickname: string
    avatarUrl: string
  }
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly wxApiService: WxApiService,
  ) {}

  /**
   * 微信登录
   */
  async wxLogin(loginDto: { code: string; userInfo?: object }): Promise<AuthResult> {
    const { code, userInfo } = loginDto

    // 获取微信用户信息
    const wxUserInfo = await this.wxApiService.code2Session(code)

    // 检查用户是否存在
    let user = await this.findUserByOpenId(wxUserInfo.openid)

    // 如果是新用户，创建用户
    if (!user) {
      user = await this.createUser({
        openId: wxUserInfo.openid,
        nickname: userInfo?.nickname || '',
        avatarUrl: userInfo?.avatarUrl || '',
      })
    }

    // 生成token
    const tokens = this.generateTokens(user.id, user.openId)

    return {
      ...tokens,
      user: {
        id: user.id,
        openId: user.openId,
        nickname: user.nickname,
        avatarUrl: user.avatarUrl,
      },
    }
  }

  /**
   * 获取用户信息
   */
  async getUserInfo(userId: string) {
    const user = await this.findUserById(userId)
    if (!user) {
      throw new UnauthorizedException('User not found')
    }

    return {
      id: user.id,
      openId: user.openId,
      nickname: user.nickname,
      avatarUrl: user.avatarUrl,
      phoneNumber: user.phoneNumber,
      createdAt: user.createdAt,
    }
  }

  /**
   * 刷新token
   */
  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      })

      if (payload.type !== 'refresh') {
        throw new UnauthorizedException('Invalid token type')
      }

      const user = await this.findUserById(payload.userId)
      if (!user) {
        throw new UnauthorizedException('User not found')
      }

      return this.generateTokens(user.id, user.openId)
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token')
    }
  }

  /**
   * 生成JWT令牌
   */
  private generateTokens(userId: string, openId: string) {
    const payload = { userId, openId }

    return {
      accessToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN || '7d',
      }),
      refreshToken: this.jwtService.sign(
        { ...payload, type: 'refresh' },
        {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
        }
      ),
      expiresIn: this.parseExpirationTime(process.env.JWT_EXPIRES_IN || '7d'),
    }
  }

  private parseExpirationTime(expiration: string): number {
    const unit = expiration.slice(-1)
    const value = parseInt(expiration.slice(0, -1))
    const multipliers = { d: 86400, h: 3600, m: 60, s: 1 }
    return value * (multipliers[unit as keyof typeof multipliers] || 1)
  }

  private async findUserByOpenId(openId: string) {
    // 查询数据库逻辑
  }

  private async findUserById(userId: string) {
    // 查询数据库逻辑
  }

  private async createUser(userData: {
    openId: string
    nickname: string
    avatarUrl: string
  }) {
    // 创建用户逻辑
  }
}
```

### 2. 小程序API服务 (api/)

#### 微信API服务 (src/api/wx-api.service.ts)
```typescript
import { Injectable } from '@nestjs/common'
import axios from 'axios'

@Injectable()
export class WxApiService {
  private readonly appId = process.env.WECHAT_APP_ID
  private readonly appSecret = process.env.WECHAT_APP_SECRET
  private readonly baseUrl = 'https://api.weixin.qq.com'

  /**
   * 登录凭证校验
   */
  async code2Session(code: string): Promise<{
    openid: string
    session_key: string
    unionid?: string
  }> {
    const url = `${this.baseUrl}/sns/jscode2session`
    const params = {
      appid: this.appId,
      secret: this.appSecret,
      js_code: code,
      grant_type: 'authorization_code',
    }

    const response = await axios.get(url, { params })
    const data = response.data

    if (data.errcode) {
      throw new Error(`微信API错误: ${data.errmsg}`)
    }

    return {
      openid: data.openid,
      session_key: data.session_key,
      unionid: data.unionid,
    }
  }

  /**
   * 获取access_token
   */
  async getAccessToken(): Promise<string> {
    const url = `${this.baseUrl}/cgi-bin/token`
    const params = {
      grant_type: 'client_credential',
      appid: this.appId,
      secret: this.appSecret,
    }

    const response = await axios.get(url, { params })
    const data = response.data

    if (data.errcode) {
      throw new Error(`获取access_token失败: ${data.errmsg}`)
    }

    return data.access_token
  }

  /**
   * 发送模板消息
   */
  async sendTemplateMessage(message: {
    touser: string
    template_id: string
    page?: string
    form_id: string
    data: Record<string, any>
  }) {
    const accessToken = await this.getAccessToken()
    const url = `${this.baseUrl}/cgi-bin/message/template/send?access_token=${accessToken}`

    const response = await axios.post(url, message)
    return response.data
  }

  /**
   * 获取小程序码
   */
  async getWxaCode(scene: string, page: string): Promise<Buffer> {
    const accessToken = await this.getAccessToken()
    const url = `${this.baseUrl}/wxa/getwxacodeunlimit?access_token=${accessToken}`

    const response = await axios.post(
      url,
      {
        scene,
        page,
        width: 280,
        auto_color: false,
        line_color: { r: 0, g: 0, b: 0 },
      },
      { responseType: 'arraybuffer' }
    )

    return Buffer.from(response.data)
  }

  /**
   * 获取微信服务器地址IP段
   */
  async getCallbackIp(): Promise<string[]> {
    const accessToken = await this.getAccessToken()
    const url = `${this.baseUrl}/cgi-bin/getcallbackip?access_token=${accessToken}`

    const response = await axios.get(url)
    const data = response.data

    if (data.errcode) {
      throw new Error(`获取IP段失败: ${data.errmsg}`)
    }

    return data.ip_list
  }
}
```

### 3. 消息处理 (message/)

#### 消息控制器 (src/message/message.controller.ts)
```typescript
import { Controller, Post, Body, Get, Query, Req, Res } from '@nestjs/common'
import { MessageService } from './message.service'
import { Request, Response } from 'express'

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  /**
   * 接收小程序消息
   */
  @Post('receive')
  async receiveMessage(@Body() messageBody: any, @Req() req: Request, @Res() res: Response) {
    // 验证签名
    const signature = req.headers['x-wechat-signature'] as string
    const timestamp = req.headers['x-wechat-timestamp'] as string
    const nonce = req.headers['x-wechat-nonce'] as string

    const isValid = this.messageService.verifySignature(
      signature,
      timestamp,
      nonce,
      JSON.stringify(messageBody)
    )

    if (!isValid) {
      return res.status(401).send('Invalid signature')
    }

    // 处理消息
    const result = await this.messageService.processMessage(messageBody)
    return res.send(result)
  }

  /**
   * 获取消息模板列表
   */
  @Get('templates')
  async getTemplates() {
    return this.messageService.getTemplates()
  }

  /**
   * 发送模板消息
   */
  @Post('send')
  async sendMessage(
    @Body()
    messageData: {
      touser: string
      template_id: string
      page?: string
      form_id: string
      data: Record<string, any>
    }
  ) {
    return this.messageService.sendTemplateMessage(messageData)
  }
}
```

#### 消息服务 (src/message/message.service.ts)
```typescript
import { Injectable } from '@nestjs/common'
import { WxApiService } from '../api/wx-api.service'
import { createHmac } from 'crypto'

@Injectable()
export class MessageService {
  private readonly token = process.env.WECHAT_TOKEN

  constructor(private readonly wxApiService: WxApiService) {}

  /**
   * 验证微信服务器签名
   */
  verifySignature(signature: string, timestamp: string, nonce: string, body: string): boolean {
    const str = [this.token, timestamp, nonce].sort().join('')
    const hash = createHmac('sha1', str).update(body).digest('hex')
    return hash === signature
  }

  /**
   * 处理接收到的消息
   */
  async processMessage(messageBody: any): Promise<any> {
    const { MsgType } = messageBody

    switch (MsgType) {
      case 'text':
        return this.processTextMessage(messageBody)
      case 'image':
        return this.processImageMessage(messageBody)
      case 'event':
        return this.processEventMessage(messageBody)
      default:
        return { msg: 'success' }
    }
  }

  private async processTextMessage(message: any): Promise<any> {
    // 处理文本消息
    const content = message.Content

    // 自动回复逻辑
    if (content === 'help') {
      return {
        msgtype: 'text',
        text: {
          content: '欢迎使用小程序帮助',
        },
      }
    }

    return { msg: 'success' }
  }

  private async processImageMessage(message: any): Promise<any> {
    // 处理图片消息
    console.log('Received image message:', message.PicUrl)
    return { msg: 'success' }
  }

  private async processEventMessage(message: any): Promise<any> {
    // 处理事件消息
    const { Event, EventKey } = message

    switch (Event) {
      case 'subscribe':
        return this.handleSubscribe(message)
      case 'CLICK':
        return this.handleClick(EventKey, message)
      default:
        return { msg: 'success' }
    }
  }

  private async handleSubscribe(message: any): Promise<any> {
    return {
      msgtype: 'text',
      text: {
        content: '欢迎关注！',
      },
    }
  }

  private async handleClick(eventKey: string, message: any): Promise<any> {
    // 处理菜单点击事件
    console.log('Menu clicked:', eventKey)
    return { msg: 'success' }
  }

  /**
   * 发送模板消息
   */
  async sendTemplateMessage(messageData: {
    touser: string
    template_id: string
    page?: string
    form_id: string
    data: Record<string, any>
  }) {
    return this.wxApiService.sendTemplateMessage(messageData)
  }

  /**
   * 获取模板列表
   */
  async getTemplates() {
    const accessToken = await this.wxApiService.getAccessToken()
    // 调用微信API获取模板列表
    return { templates: [] }
  }
}
```

## 配置管理

### 微信配置 (src/config/wx.config.ts)
```typescript
export const wxConfig = {
  // 微信小程序配置
  miniProgram: {
    appId: process.env.WECHAT_MINI_PROGRAM_APP_ID || '',
    appSecret: process.env.WECHAT_MINI_PROGRAM_APP_SECRET || '',
    token: process.env.WECHAT_TOKEN || '',
    encodingAESKey: process.env.WECHAT_ENCODING_AES_KEY || '',
  },

  // 微信支付配置
  pay: {
    mchId: process.env.WECHAT_PAY_MCH_ID || '',
    apiKey: process.env.WECHAT_PAY_API_KEY || '',
    certPath: process.env.WECHAT_PAY_CERT_PATH || '',
    keyPath: process.env.WECHAT_PAY_KEY_PATH || '',
  },

  // 微信服务器配置
  server: {
    url: process.env.WECHAT_SERVER_URL || 'https://your-domain.com',
    token: process.env.WECHAT_SERVER_TOKEN || '',
  },

  // API配置
  api: {
    baseUrl: 'https://api.weixin.qq.com',
    timeout: 5000,
    retryTimes: 3,
  },
}
```

### 小程序配置 (src/config/mp.config.ts)
```typescript
export const mpConfig = {
  // 功能开关
  features: {
    login: true,
    payment: true,
    message: true,
    template: true,
    code: true,
  },

  // 限制配置
  limits: {
    dailyLoginCount: 1000,
    messageCountPerDay: 10000,
    codeCountPerDay: 100,
  },

  // 缓存配置
  cache: {
    ttl: 3600, // 1小时
    maxSize: 1000,
  },

  // 日志配置
  logging: {
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    enableFileLogging: true,
    logPath: './logs/mp',
  },
}
```

## 工具函数

### 加密工具 (src/utils/crypto.utils.ts)
```typescript
import { createHmac, createCipheriv, createDecipheriv } from 'crypto'

export class CryptoUtils {
  /**
   * SHA1加密
   */
  static sha1(str: string): string {
    return createHmac('sha1', '').update(str).digest('hex')
  }

  /**
   * SHA256加密
   */
  static sha256(str: string): string {
    return createHmac('sha256', '').update(str).digest('hex')
  }

  /**
   * AES加密
   */
  static aesEncrypt(text: string, key: string, iv: string): string {
    const cipher = createCipheriv('aes-256-cbc', key, iv)
    let encrypted = cipher.update(text, 'utf8', 'hex')
    encrypted += cipher.final('hex')
    return encrypted
  }

  /**
   * AES解密
   */
  static aesDecrypt(encryptedText: string, key: string, iv: string): string {
    const decipher = createDecipheriv('aes-256-cbc', key, iv)
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    return decrypted
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
   * 生成时间戳
   */
  static generateTimestamp(): number {
    return Math.floor(Date.now() / 1000)
  }
}
```

### 签名工具 (src/utils/signature.utils.ts)
```typescript
import { createHmac } from 'crypto'

export class SignatureUtils {
  /**
   * 生成微信签名
   */
  static generateWxSignature(params: Record<string, any>, key: string): string {
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
   * 验证微信签名
   */
  static verifyWxSignature(
    params: Record<string, any>,
    signature: string,
    key: string
  ): boolean {
    const calculatedSignature = this.generateWxSignature(params, key)
    return calculatedSignature === signature.toUpperCase()
  }

  /**
   * 生成URL签名
   */
  static generateUrlSignature(url: string, params: Record<string, any>, secret: string): string {
    const stringA = Object.keys(params)
      .sort()
      .map((k) => `${k}=${params[k]}`)
      .join('&')

    const stringSignTemp = `GET${url}?${stringA}${secret}`

    return createHmac('sha1', secret)
      .update(stringSignTemp, 'utf8')
      .digest('hex')
  }
}
```

## 依赖详情

### 核心依赖
```json
{
  "@nestjs/common": "^6.2.2",              // NestJS核心
  "reflect-metadata": "^0.1.12",           // 反射元数据
  "rxjs": "^6.5.2",                       // 响应式编程
  "snyk": "^1.1183.0"                     // 安全扫描
}
```

### 开发依赖
```json
{
  "@nestjs/testing": "^6.2.2",             // 测试工具
  "@types/express": "4.17.17",              // Express类型
  "@types/node": "^20.12.8",                // Node类型
  "@types/supertest": "2.0.12",             // 测试类型
  "nodemon": "1.19.0",                      // 开发监控
  "supertest": "4.0.2",                     // HTTP测试
  "ts-loader": "6.0.1",                     // TypeScript加载器
  "tsconfig-paths": "3.8.0",                // 路径映射
  "tslint": "5.11.0",                       // 代码检查
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

## 环境变量

### 必需变量
```bash
# 微信小程序
WECHAT_MINI_PROGRAM_APP_ID=your_app_id
WECHAT_MINI_PROGRAM_APP_SECRET=your_app_secret
WECHAT_TOKEN=your_token
WECHAT_ENCODING_AES_KEY=your_encoding_aes_key

# JWT配置
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your_refresh_secret
JWT_REFRESH_EXPIRES_IN=30d

# 服务器配置
WECHAT_SERVER_URL=https://your-domain.com
WECHAT_SERVER_TOKEN=your_server_token
```

## 最佳实践

### 1. 安全考虑
- 验证所有微信服务器请求签名
- 使用HTTPS加密传输
- 定期刷新access_token
- 避免在客户端存储敏感信息

### 2. 性能优化
- 缓存access_token
- 使用连接池复用连接
- 异步处理消息
- 合理设置超时时间

### 3. 错误处理
- 捕获微信API异常
- 重试机制处理临时失败
- 记录详细错误日志
- 优雅降级

### 4. 数据存储
- 用户信息加密存储
- 会话信息短期缓存
- 消息记录持久化
- 定期清理过期数据

## 常见问题

### Q: 如何处理小程序登录？
A:
```typescript
// 1. 获取code
const loginRes = await wx.login()
const code = loginRes.code

// 2. 发送到后端
const result = await wx.request({
  url: '/api/auth/wx-login',
  method: 'POST',
  data: { code },
})

// 3. 保存token
wx.setStorageSync('accessToken', result.data.accessToken)
```

### Q: 如何发送模板消息？
A:
```typescript
// 1. 获取form_id
const formId = e.detail.formId

// 2. 发送到后端
await wx.request({
  url: '/api/message/send',
  method: 'POST',
  data: {
    touser: 'openid',
    template_id: 'template_id',
    form_id: formId,
    data: { keyword1: { value: 'value1' } },
  },
})
```

### Q: 如何获取小程序码？
A:
```typescript
// 1. 调用后端API
const qrCode = await this.wxApiService.getWxaCode('scene=123', 'pages/index/index')

// 2. 显示图片
<img src={`data:image/png;base64,${qrCode.toString('base64')}`} />
```

## 相关资源

- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)
- [NestJS文档](https://docs.nestjs.com/)
- [微信API文档](https://developers.weixin.qq.com/miniprogram/dev/api/)

---

*最后更新: 2025-11-02*
