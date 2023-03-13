import nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { getMessageFromNormalError } from '@/common/transformers/error.transformer'
import { EMAIL } from '@/config/admin.config';
import logger from '@/utils/logger';

// 邮件格式
export interface IEmailOptions {
  to: string
  subject: string
  text: string
  html: string
}

@Injectable()
export class EmailService {
  private transporter: nodemailer
  private clientIsValid: boolean

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.qq.com',
      secure: true,
      port: 465,
      auth: {
        user: EMAIL.account,
        pass: EMAIL.password,
      },
    })
    this.verifyClient()
  }

  // 验证有效性
  private verifyClient(): void {
    return this.transporter.verify((error) => {
      if (error) {
        this.clientIsValid = false
        setTimeout(this.verifyClient.bind(this), 1000 * 60 * 30)
        logger.error(`[NodeMailer]`, `客户端初始化连接失败！将在半小时后重试`, getMessageFromNormalError(error))
      } else {
        this.clientIsValid = true
        logger.info('[NodeMailer]', '客户端初始化连接成功！随时可发送邮件')
      }
    })
  }

  // 发邮件
  public sendMail(mailOptions: IEmailOptions) {
    if (!this.clientIsValid) {
      logger.warn('[NodeMailer]', '由于未初始化成功，邮件客户端发送被拒绝！')
      return false
    }
    const options = Object.assign(mailOptions, { from: EMAIL.from })
    this.transporter.sendMail(options, (error, info) => {
      if (error) {
        logger.error(`[NodeMailer]`, `邮件发送失败`, getMessageFromNormalError(error))
      } else {
        logger.info('[NodeMailer]', '邮件发送成功', info.messageId, info.response)
      }
    })
  }
}
