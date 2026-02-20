# WeChat微信公众号模块 - packages/wechat/wechat-gzh

## 导航

> 根目录 / [共享包](../CLAUDE.md#共享包详解) / **wechat-gzh**

## 概述

**微信公众号SDK** - 基于NestJS的微信公众号开发工具包，提供公众号API封装和消息处理

## 技术栈

- **框架**: NestJS 6.2.2, RxJS 6.5.2
- **语言**: TypeScript 5.4.5
- **构建**: ts-loader, tslint
- **开发**: nodemon, ts-node
- **测试**: @nestjs/testing, supertest
- **安全**: Snyk安全扫描

## 目录结构

```
packages/wechat/wechat-gzh/
├── src/
│   ├── auth/                   # 公众号认证
│   │   ├── auth.controller.ts  # 认证控制器
│   │   ├── auth.service.ts    # 认证服务
│   │   ├── auth.module.ts     # 认证模块
│   │   └── strategies/        # 认证策略
│   │       └── gzh.strategy.ts # 公众号认证策略
│   ├── message/               # 消息处理
│   │   ├── message.controller.ts # 消息控制器
│   │   ├── message.service.ts # 消息服务
│   │   ├── handlers/         # 消息处理器
│   │   │   ├── text.handler.ts # 文本消息处理
│   │   │   ├── image.handler.ts # 图片消息处理
│   │   │   ├── voice.handler.ts # 语音消息处理
│   │   │   ├── video.handler.ts # 视频消息处理
│   │   │   ├── event.handler.ts # 事件消息处理
│   │   │   └── menu.handler.ts # 菜单事件处理
│   │   ├── templates/        # 消息模板
│   │   └── reply.service.ts  # 回复服务
│   ├── material/             # 素材管理
│   │   ├── material.controller.ts # 素材控制器
│   │   ├── material.service.ts # 素材服务
│   │   └── material.module.ts # 素材模块
│   ├── menu/                # 自定义菜单
│   │   ├── menu.controller.ts # 菜单控制器
│   │   ├── menu.service.ts  # 菜单服务
│   │   └── menu.module.ts   # 菜单模块
│   ├── user/                # 用户管理
│   │   ├── user.controller.ts # 用户控制器
│   │   ├── user.service.ts  # 用户服务
│   │   └── user.module.ts   # 用户模块
│   ├── qrcode/              # 二维码管理
│   │   ├── qrcode.controller.ts # 二维码控制器
│   │   ├── qrcode.service.ts # 二维码服务
│   │   └── qrcode.module.ts # 二维码模块
│   ├── custom/              # 客服消息
│   │   ├── custom.controller.ts # 客服控制器
│   │   ├── custom.service.ts # 客服服务
│   │   └── custom.module.ts # 客服模块
│   ├── broadcast/           # 群发消息
│   │   ├── broadcast.controller.ts # 群发控制器
│   │   ├── broadcast.service.ts # 群发服务
│   │   └── broadcast.module.ts # 群发模块
│   ├── config/              # 配置文件
│   │   ├── gzh.config.ts   # 公众号配置
│   │   ├── constants.ts     # 常量定义
│   │   └── types.ts        # 类型定义
│   ├── utils/              # 工具函数
│   │   ├── crypto.utils.ts # 加密工具
│   │   ├── signature.utils.ts # 签名工具
│   │   ├── xml.utils.ts    # XML处理工具
│   │   └── media.utils.ts  # 媒体工具
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

### 1. 消息处理 (message/)

#### 消息控制器 (src/message/message.controller.ts)
```typescript
import { Controller, Post, Body, Get, Query, Req, Res, HttpCode } from '@nestjs/common'
import { MessageService } from './message.service'
import { Request, Response } from 'express'

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  /**
   * 接收微信公众号消息
   */
  @Post('receive')
  @HttpCode(200)
  async receiveMessage(
    @Body() messageBody: string,
    @Query('signature') signature: string,
    @Query('timestamp') timestamp: string,
    @Query('nonce') nonce: string,
    @Query('openid') openid: string,
    @Req() req: Request,
    @Res() res: Response
  ) {
    // 验证签名
    const isValid = this.messageService.verifySignature(
      signature,
      timestamp,
      nonce,
      messageBody
    )

    if (!isValid) {
      return res.status(401).send('Invalid signature')
    }

    // 处理消息
    const reply = await this.messageService.processMessage(messageBody)

    // 返回XML格式的回复
    if (reply) {
      return res.type('text/xml').send(reply)
    }

    return res.send('success')
  }

  /**
   * 获取服务器配置信息
   */
  @Get('server-config')
  async getServerConfig() {
    return this.messageService.getServerConfig()
  }

  /**
   * 发送客服消息
   */
  @Post('custom-message')
  async sendCustomMessage(
    @Body()
    messageData: {
      touser: string
      msgtype: 'text' | 'image' | 'voice' | 'video' | 'music' | 'news'
      [key: string]: any
    }
  ) {
    return this.messageService.sendCustomMessage(messageData)
  }
}
```

#### 消息服务 (src/message/message.service.ts)
```typescript
import { Injectable } from '@nestjs/common'
import { createHmac } from 'crypto'
import { parseString, Builder } from 'xml2js'
import { ReplyService } from './reply.service'
import { TextHandler } from './handlers/text.handler'
import { EventHandler } from './handlers/event.handler'

@Injectable()
export class MessageService {
  private readonly token = process.env.WECHAT_GZH_TOKEN
  private readonly encodingAESKey = process.env.WECHAT_GZH_ENCODING_AES_KEY
  private readonly appId = process.env.WECHAT_GZH_APP_ID

  constructor(
    private readonly replyService: ReplyService,
    private readonly textHandler: TextHandler,
    private readonly eventHandler: EventHandler
  ) {}

  /**
   * 验证微信服务器签名
   */
  verifySignature(
    signature: string,
    timestamp: string,
    nonce: string,
    body: string
  ): boolean {
    const str = [this.token, timestamp, nonce].sort().join('')
    const hash = createHmac('sha1', '').update(str).digest('hex')
    return hash === signature
  }

  /**
   * 处理接收到的消息
   */
  async processMessage(xmlBody: string): Promise<string | null> {
    const message = await this.parseXml(xmlBody)
    const { MsgType, Event } = message

    switch (MsgType) {
      case 'text':
        return this.textHandler.handle(message)
      case 'image':
      case 'voice':
      case 'video':
      case 'music':
      case 'news':
        return this.replyService.replyText(message.FromUserName, message.ToUserName, '收到消息')
      case 'event':
        return this.eventHandler.handle(message)
      default:
        return null
    }
  }

  /**
   * 解析XML消息
   */
  private async parseXml(xml: string): Promise<any> {
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
   * 获取服务器配置
   */
  getServerConfig() {
    return {
      url: process.env.WECHAT_GZH_SERVER_URL || 'https://your-domain.com/wechat/message',
      token: this.token,
      encodingAESKey: this.encodingAESKey,
      appId: this.appId,
    }
  }

  /**
   * 发送客服消息
   */
  async sendCustomMessage(messageData: {
    touser: string
    msgtype: string
    [key: string]: any
  }) {
    const accessToken = await this.getAccessToken()
    const url = `https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=${accessToken}`

    // 发送HTTP请求
    // ... 实现发送逻辑
  }

  private async getAccessToken(): Promise<string> {
    const url = `https://api.weixin.qq.com/cgi-bin/token`
    const params = {
      grant_type: 'client_credential',
      appid: this.appId,
      secret: process.env.WECHAT_GZH_APP_SECRET,
    }

    // 调用微信API获取access_token
    // ... 实现获取逻辑
    return 'access_token'
  }
}
```

#### 文本消息处理器 (src/message/handlers/text.handler.ts)
```typescript
import { Injectable } from '@nestjs/common'
import { ReplyService } from '../reply.service'

@Injectable()
export class TextHandler {
  constructor(private readonly replyService: ReplyService) {}

  async handle(message: any): Promise<string | null> {
    const { Content, FromUserName, ToUserName } = message

    // 自动回复逻辑
    switch (Content) {
      case '帮助':
      case 'help':
        return this.replyService.replyText(
          FromUserName,
          ToUserName,
          '欢迎关注！发送"1"查看功能介绍，发送"2"联系客服。'
        )

      case '1':
        return this.replyService.replyText(
          FromUserName,
          ToUserName,
          '功能介绍：\n1. 查看产品信息\n2. 在线咨询\n3. 订单查询'
        )

      case '2':
        // 返回图文消息
        return this.replyService.replyNews(FromUserName, ToUserName, [
          {
            title: '联系我们',
            description: '点击查看联系方式',
            picUrl: 'https://example.com/image.jpg',
            url: 'https://example.com/contact',
          },
        ])

      case '天气':
        // 调用天气API
        const weather = await this.getWeather()
        return this.replyService.replyText(FromUserName, ToUserName, weather)

      default:
        // 关键词匹配
        if (Content.includes('价格')) {
          return this.replyService.replyText(
            FromUserName,
            ToUserName,
            '请查看我们的产品页面了解详细信息。'
          )
        }

        if (Content.includes('售后')) {
          return this.replyService.replyText(
            FromUserName,
            ToUserName,
            '客服电话：400-123-4567\n工作时间：周一至周日 9:00-21:00'
          )
        }

        // 默认回复
        return this.replyService.replyText(
          FromUserName,
          ToUserName,
          '抱歉，我不太明白您的意思。发送"帮助"查看可用功能。'
        )
    }
  }

  private async getWeather(): Promise<string> {
    // 调用天气API
    // ... 实现天气查询逻辑
    return '今天天气晴朗，气温25°C。'
  }
}
```

#### 事件处理器 (src/message/handlers/event.handler.ts)
```typescript
import { Injectable } from '@nestjs/common'
import { ReplyService } from '../reply.service'

@Injectable()
export class EventHandler {
  constructor(private readonly replyService: ReplyService) {}

  async handle(message: any): Promise<string | null> {
    const { Event, EventKey, FromUserName, ToUserName } = message

    switch (Event) {
      case 'subscribe':
        return this.handleSubscribe(FromUserName, ToUserName, EventKey)

      case 'unsubscribe':
        return this.handleUnsubscribe(FromUserName)

      case 'CLICK':
        return this.handleClick(FromUserName, ToUserName, EventKey)

      case 'VIEW':
        return this.handleView(FromUserName, EventKey)

      case 'SCAN':
        return this.handleScan(FromUserName, ToUserName, EventKey)

      default:
        return null
    }
  }

  private handleSubscribe(FromUserName: string, ToUserName: string, EventKey?: string): string {
    // 关注事件
    const welcomeMessage = `欢迎关注我们的公众号！

    这里为您提供：
    • 最新产品信息
    • 优惠活动通知
    • 在线咨询服务

    发送"帮助"查看更多功能。`

    return this.replyService.replyText(FromUserName, ToUserName, welcomeMessage)
  }

  private handleUnsubscribe(FromUserName: string): string | null {
    // 取消关注事件
    console.log(`User ${FromUserName} unsubscribed`)
    return null
  }

  private handleClick(FromUserName: string, ToUserName: string, EventKey: string): string | null {
    // 菜单点击事件
    switch (EventKey) {
      case 'V1001_HELP':
        return this.replyService.replyText(
          FromUserName,
          ToUserName,
          '帮助中心：\n1. 产品咨询\n2. 售后服务\n3. 常见问题'
        )

      case 'V1001_CONTACT':
        return this.replyService.replyText(
          FromUserName,
          ToUserName,
          '联系方式：\n电话：400-123-4567\n微信：service\n工作时间：9:00-21:00'
        )

      case 'V1001_PRODUCT':
        return this.replyService.replyNews(FromUserName, ToUserName, [
          {
            title: '热门产品',
            description: '查看我们的热销产品',
            picUrl: 'https://example.com/product.jpg',
            url: 'https://example.com/products',
          },
        ])

      default:
        return null
    }
  }

  private handleView(FromUserName: string, EventKey: string): string | null {
    // 菜单跳转事件
    console.log(`User ${FromUserName} clicked menu: ${EventKey}`)
    return null
  }

  private handleScan(FromUserName: string, ToUserName: string, EventKey: string): string | null {
    // 扫描二维码事件
    return this.replyService.replyText(
      FromUserName,
      ToUserName,
      '感谢您的扫码！'
    )
  }
}
```

### 2. 素材管理 (material/)

#### 素材控制器 (src/material/material.controller.ts)
```typescript
import { Controller, Post, Get, Delete, Param, Body, UploadedFile, UseInterceptors } from '@nestjs/common'
import { MaterialService } from './material.service'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('material')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  /**
   * 上传临时素材
   */
  @Post('upload')
  @UseInterceptors(FileInterceptor('media'))
  async uploadTempMaterial(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { type: 'image' | 'voice' | 'video' | 'thumb' }
  ) {
    return this.materialService.uploadTempMaterial(file, body.type)
  }

  /**
   * 上传永久素材
   */
  @Post('upload-permanent')
  @UseInterceptors(FileInterceptor('media'))
  async uploadPermanentMaterial(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { type: 'image' | 'voice' | 'video'; title?: string; introduction?: string }
  ) {
    return this.materialService.uploadPermanentMaterial(file, body)
  }

  /**
   * 获取临时素材
   */
  @Get('temp/:mediaId')
  async getTempMaterial(@Param('mediaId') mediaId: string) {
    return this.materialService.getTempMaterial(mediaId)
  }

  /**
   * 获取永久素材
   */
  @Get('permanent/:mediaId')
  async getPermanentMaterial(@Param('mediaId') mediaId: string) {
    return this.materialService.getPermanentMaterial(mediaId)
  }

  /**
   * 删除永久素材
   */
  @Delete(':mediaId')
  async deleteMaterial(@Param('mediaId') mediaId: string) {
    return this.materialService.deleteMaterial(mediaId)
  }

  /**
   * 获取素材列表
   */
  @Get('list')
  async getMaterialList(@Body() body: { type: string; offset?: number; count?: number }) {
    return this.materialService.getMaterialList(body)
  }
}
```

#### 素材服务 (src/material/material.service.ts)
```typescript
import { Injectable } from '@nestjs/common'
import * as fs from 'fs-extra'
import * as path from 'path'
import axios from 'axios'
import * as FormData from 'form-data'

@Injectable()
export class MaterialService {
  private readonly uploadPath = process.env.UPLOAD_PATH || './uploads'

  constructor() {
    // 确保上传目录存在
    fs.ensureDirSync(this.uploadPath)
  }

  /**
   * 上传临时素材
   */
  async uploadTempMaterial(file: Express.Multer.File, type: string) {
    const accessToken = await this.getAccessToken()
    const url = `https://api.weixin.qq.com/cgi-bin/media/upload?access_token=${accessToken}&type=${type}`

    const formData = new FormData()
    formData.append('media', file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype,
    })

    const response = await axios.post(url, formData, {
      headers: formData.getHeaders(),
    })

    return response.data
  }

  /**
   * 上传永久素材
   */
  async uploadPermanentMaterial(file: Express.Multer.File, body: {
    type: string
    title?: string
    introduction?: string
  }) {
    const accessToken = await this.getAccessToken()
    const url = `https://api.weixin.qq.com/cgi-bin/material/add_material?access_token=${accessToken}`

    const formData = new FormData()
    formData.append('media', file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype,
    })

    formData.append('description', JSON.stringify({
      title: body.title,
      introduction: body.introduction,
    }))

    const response = await axios.post(url, formData, {
      headers: formData.getHeaders(),
    })

    return response.data
  }

  /**
   * 获取临时素材
   */
  async getTempMaterial(mediaId: string): Promise<Buffer> {
    const accessToken = await this.getAccessToken()
    const url = `https://api.weixin.qq.com/cgi-bin/media/get?access_token=${accessToken}&media_id=${mediaId}`

    const response = await axios.get(url, { responseType: 'stream' })
    return Buffer.from(await response.data.arrayBuffer())
  }

  /**
   * 获取永久素材
   */
  async getPermanentMaterial(mediaId: string): Promise<Buffer> {
    const accessToken = await this.getAccessToken()
    const url = `https://api.weixin.qq.com/cgi-bin/material/get_material?access_token=${accessToken}`

    const response = await axios.post(
      url,
      { media_id: mediaId },
      { responseType: 'stream' }
    )

    return Buffer.from(await response.data.arrayBuffer())
  }

  /**
   * 删除永久素材
   */
  async deleteMaterial(mediaId: string) {
    const accessToken = await this.getAccessToken()
    const url = `https://api.weixin.qq.com/cgi-bin/material/del_material?access_token=${accessToken}`

    const response = await axios.post(url, { media_id: mediaId })
    return response.data
  }

  /**
   * 获取素材列表
   */
  async getMaterialList(body: { type: string; offset?: number; count?: number }) {
    const accessToken = await this.getAccessToken()
    const url = `https://api.weixin.qq.com/cgi-bin/material/batchget_material?access_token=${accessToken}`

    const response = await axios.post(url, {
      type: body.type,
      offset: body.offset || 0,
      count: body.count || 20,
    })

    return response.data
  }

  private async getAccessToken(): Promise<string> {
    // 实现获取access_token的逻辑
    return 'access_token'
  }
}
```

### 3. 自定义菜单 (menu/)

#### 菜单服务 (src/menu/menu.service.ts)
```typescript
import { Injectable } from '@nestjs/common'
import axios from 'axios'

export interface MenuButton {
  type?: 'click' | 'view' | 'scancode_push' | 'scancode_waitmsg' | 'pic_sysphoto' | 'pic_photo_or_album' | 'pic_weixin' | 'location_select' | 'media_id' | 'view_limited' | 'miniprogram'
  name: string
  key?: string
  url?: string
  appid?: string
  pagepath?: string
  media_id?: string
  sub_button?: MenuButton[]
}

export interface MenuConfig {
  button: MenuButton[]
}

@Injectable()
export class MenuService {
  /**
   * 创建自定义菜单
   */
  async createMenu(menuConfig: MenuConfig) {
    const accessToken = await this.getAccessToken()
    const url = `https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${accessToken}`

    const response = await axios.post(url, menuConfig)
    return response.data
  }

  /**
   * 获取自定义菜单配置
   */
  async getMenu() {
    const accessToken = await this.getAccessToken()
    const url = `https://api.weixin.qq.com/cgi-bin/menu/get?access_token=${accessToken}`

    const response = await axios.get(url)
    return response.data
  }

  /**
   * 删除自定义菜单
   */
  async deleteMenu() {
    const accessToken = await this.getAccessToken()
    const url = `https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=${accessToken}`

    const response = await axios.get(url)
    return response.data
  }

  /**
   * 创建个性化菜单
   */
  async createConditionalMenu(menuConfig: MenuConfig & {
    matchrule: {
      tag_id?: string
      sex?: string
      client_platform_type?: string
      country?: string
      province?: string
      city?: string
      language?: string
    }
  }) {
    const accessToken = await this.getAccessToken()
    const url = `https://api.weixin.qq.com/cgi-bin/menu/addconditional?access_token=${accessToken}`

    const response = await axios.post(url, menuConfig)
    return response.data
  }

  /**
   * 删除个性化菜单
   */
  async deleteConditionalMenu(menuId: string) {
    const accessToken = await this.getAccessToken()
    const url = `https://api.weixin.qq.com/cgi-bin/menu/delconditional?access_token=${accessToken}`

    const response = await axios.post(url, { menuid: menuId })
    return response.data
  }

  /**
   * 获取默认菜单
   */
  async getCurrentMenu() {
    const accessToken = await this.getAccessToken()
    const url = `https://api.weixin.qq.com/cgi-bin/menu/getcurrentselfmenu?access_token=${accessToken}`

    const response = await axios.get(url)
    return response.data
  }

  private async getAccessToken(): Promise<string> {
    // 实现获取access_token的逻辑
    return 'access_token'
  }
}
```

### 4. 回复服务 (src/message/reply.service.ts)
```typescript
import { Injectable } from '@nestjs/common'
import { Builder } from 'xml2js'

@Injectable()
export class ReplyService {
  /**
   * 回复文本消息
   */
  replyText(toUser: string, fromUser: string, content: string): string {
    const data = {
      xml: {
        ToUserName: { _cdata: toUser },
        FromUserName: { _cdata: fromUser },
        CreateTime: Math.floor(Date.now() / 1000),
        MsgType: { _cdata: 'text' },
        Content: { _cdata: content },
      },
    }

    return this.buildXml(data)
  }

  /**
   * 回复图片消息
   */
  replyImage(toUser: string, fromUser: string, mediaId: string): string {
    const data = {
      xml: {
        ToUserName: { _cdata: toUser },
        FromUserName: { _cdata: fromUser },
        CreateTime: Math.floor(Date.now() / 1000),
        MsgType: { _cdata: 'image' },
        Image: {
          MediaId: { _cdata: mediaId },
        },
      },
    }

    return this.buildXml(data)
  }

  /**
   * 回复语音消息
   */
  replyVoice(toUser: string, fromUser: string, mediaId: string): string {
    const data = {
      xml: {
        ToUserName: { _cdata: toUser },
        FromUserName: { _cdata: fromUser },
        CreateTime: Math.floor(Date.now() / 1000),
        MsgType: { _cdata: 'voice' },
        Voice: {
          MediaId: { _cdata: mediaId },
        },
      },
    }

    return this.buildXml(data)
  }

  /**
   * 回复视频消息
   */
  replyVideo(
    toUser: string,
    fromUser: string,
    mediaId: string,
    title?: string,
    description?: string
  ): string {
    const data = {
      xml: {
        ToUserName: { _cdata: toUser },
        FromUserName: { _cdata: fromUser },
        CreateTime: Math.floor(Date.now() / 1000),
        MsgType: { _cdata: 'video' },
        Video: {
          MediaId: { _cdata: mediaId },
          Title: { _cdata: title || '' },
          Description: { _cdata: description || '' },
        },
      },
    }

    return this.buildXml(data)
  }

  /**
   * 回复音乐消息
   */
  replyMusic(
    toUser: string,
    fromUser: string,
    music: {
      title: string
      description: string
      musicUrl: string
      hqMusicUrl: string
      thumbMediaId: string
    }
  ): string {
    const data = {
      xml: {
        ToUserName: { _cdata: toUser },
        FromUserName: { _cdata: fromUser },
        CreateTime: Math.floor(Date.now() / 1000),
        MsgType: { _cdata: 'music' },
        Music: {
          Title: { _cdata: music.title },
          Description: { _cdata: music.description },
          MusicUrl: { _cdata: music.musicUrl },
          HQMusicUrl: { _cdata: music.hqMusicUrl },
          ThumbMediaId: { _cdata: music.thumbMediaId },
        },
      },
    }

    return this.buildXml(data)
  }

  /**
   * 回复图文消息
   */
  replyNews(
    toUser: string,
    fromUser: string,
    articles: Array<{
      title: string
      description: string
      picUrl: string
      url: string
    }>
  ): string {
    const data = {
      xml: {
        ToUserName: { _cdata: toUser },
        FromUserName: { _cdata: fromUser },
        CreateTime: Math.floor(Date.now() / 1000),
        MsgType: { _cdata: 'news' },
        ArticleCount: articles.length,
        Articles: {
          item: articles.map((article) => ({
            Title: { _cdata: article.title },
            Description: { _cdata: article.description },
            PicUrl: { _cdata: article.picUrl },
            Url: { _cdata: article.url },
          })),
        },
      },
    }

    return this.buildXml(data)
  }

  private buildXml(data: any): string {
    const builder = new Builder({ cdata: true })
    return builder.buildObject(data)
  }
}
```

## 依赖详情

### 核心依赖
```json
{
  "@nestjs/common": "^6.2.2",              // NestJS核心
  "reflect-metadata": "^0.1.13",           // 反射元数据
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
pnpm start:dev                               # 开发模式
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

## 工具函数

### XML工具 (src/utils/xml.utils.ts)
```typescript
import { parseString, Builder } from 'xml2js'

export class XmlUtils {
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
}
```

### 媒体工具 (src/utils/media.utils.ts)
```typescript
import * as fs from 'fs-extra'
import * as path from 'path'
import axios from 'axios'

export class MediaUtils {
  /**
   * 下载媒体文件
   */
  static async downloadMedia(mediaUrl: string, savePath: string): Promise<string> {
    const response = await axios.get(mediaUrl, { responseType: 'stream' })
    const writer = fs.createWriteStream(savePath)

    return new Promise((resolve, reject) => {
      response.data.pipe(writer)
      let error = null

      writer.on('error', (err) => {
        error = err
        writer.close()
        reject(err)
      })

      writer.on('close', () => {
        if (!error) {
          resolve(savePath)
        }
      })
    })
  }

  /**
   * 获取文件扩展名
   */
  static getExtension(contentType: string): string {
    const extensions: Record<string, string> = {
      'image/jpeg': '.jpg',
      'image/png': '.png',
      'image/gif': '.gif',
      'image/webp': '.webp',
      'audio/mpeg': '.mp3',
      'audio/amr': '.amr',
      'video/mp4': '.mp4',
    }

    return extensions[contentType] || ''
  }

  /**
   * 验证媒体类型
   */
  static validateMediaType(type: string, allowedTypes: string[]): boolean {
    return allowedTypes.includes(type)
  }

  /**
   * 获取媒体大小
   */
  static getMediaSize(filePath: string): number {
    const stats = fs.statSync(filePath)
    return stats.size
  }
}
```

## 环境变量

### 必需变量
```bash
# 微信公众号
WECHAT_GZH_APP_ID=your_app_id
WECHAT_GZH_APP_SECRET=your_app_secret
WECHAT_GZH_TOKEN=your_token
WECHAT_GZH_ENCODING_AES_KEY=your_encoding_aes_key
WECHAT_GZH_SERVER_URL=https://your-domain.com/wechat/message

# JWT配置
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your_refresh_secret
JWT_REFRESH_EXPIRES_IN=30d
```

## 最佳实践

### 1. 安全考虑
- 验证所有微信服务器请求签名
- 使用HTTPS加密传输
- 定期刷新access_token
- 敏感信息加密存储

### 2. 消息处理
- 异步处理消息提高响应速度
- 使用消息队列处理大量消息
- 实现消息重试机制
- 记录详细日志

### 3. 素材管理
- 定期清理过期临时素材
- 使用CDN加速素材访问
- 实施素材大小限制
- 备份重要素材

### 4. 用户体验
- 快速响应用户操作
- 提供清晰的自动回复
- 个性化推荐内容
- 多渠道客服支持

## 常见问题

### Q: 如何处理加密消息？
A:
```typescript
// 微信服务器加密消息处理
const crypto = require('crypto')

function decryptMessage(encryptedMsg: string, encodingAESKey: string) {
  const key = Buffer.from(encodingAESKey + '=', 'base64')
  const msg = Buffer.from(encryptedMsg, 'base64')

  const iv = msg.slice(0, 16)
  const data = msg.slice(16)

  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
  let decoded = decipher.update(data, null, 'utf8')
  decoded += decipher.final('utf8')

  return decoded
}
```

### Q: 如何实现自定义菜单？
A:
```typescript
const menuConfig = {
  button: [
    {
      type: 'click',
      name: '产品介绍',
      key: 'V1001_PRODUCT',
    },
    {
      type: 'view',
      name: '官网',
      url: 'https://example.com',
    },
    {
      name: '更多',
      sub_button: [
        {
          type: 'scancode_waitmsg',
          name: '扫码查询',
          key: 'V1001_SCAN',
        },
      ],
    },
  ],
}

await this.menuService.createMenu(menuConfig)
```

### Q: 如何发送群发消息？
A:
```typescript
async sendBroadcast(message: { content: string; userIds?: string[] }) {
  const accessToken = await this.getAccessToken()

  if (message.userIds) {
    // 指定用户群发
    const url = `https://api.weixin.qq.com/cgi-bin/message/mass/send?access_token=${accessToken}`
    await axios.post(url, {
      touser: message.userIds,
      msgtype: 'text',
      text: { content: message.content },
    })
  } else {
    // 全部用户群发
    const url = `https://api.weixin.qq.com/cgi-bin/message/mass/sendall?access_token=${accessToken}`
    await axios.post(url, {
      filter: { is_to_all: true },
      msgtype: 'text',
      text: { content: message.content },
    })
  }
}
```

## 相关资源

- [微信公众平台文档](https://developers.weixin.qq.com/doc/)
- [NestJS文档](https://docs.nestjs.com/)
- [微信API文档](https://developers.weixin.qq.com/doc/offiaccount/)

---

*最后更新: 2025-11-02*
