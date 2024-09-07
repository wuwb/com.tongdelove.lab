import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { createTransport, Transporter } from 'nodemailer'
import { SendMailDto } from './dto/send-mail.dto'
import { User, Prisma } from '@prisma/client'
import { UserService } from '@/modules/system/user/user.service'

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name)

  transporter: Transporter

  constructor(private readonly configService: ConfigService) {
    this.transporter = createTransport({
      host: this.configService.get<string>('mail.host'),
      port: this.configService.get<number>('mail.port'),
      pool: true,
      secure: false,
      tls: { ciphers: 'SSLv3' },
      auth: {
        user: this.configService.get<string>('mail.username'),
        pass: this.configService.get<string>('mail.password'),
      },
    })
  }

  /**
   * 发送邮件
   * @param sendMailDto
   */
  async sendMail(sendMailDto: SendMailDto): Promise<any> {
    await this.transporter.sendMail({
      from: `${sendMailDto.from.name} <${sendMailDto.from.email}>`,
      to: `${sendMailDto.to.name} <${sendMailDto.to.email}>`,
      subject: sendMailDto.subject, // 标题
      text: sendMailDto.message, // 文本内容
      html: sendMailDto.message, // html 内容
    })
  }

  /**
   * 发送验证码
   * @param from
   * @param to
   * @param code
   */
  async sendCodeMail(from, to, code) {
    const content = `尊敬的用户你好，您的验证码是${code}`
    const result = await this.sendMail({
      from: {
        name: 'wuwenbin',
        email: from,
      },
      to: {
        name: '',
        email: to,
      },
      subject: '验证码通知',
      message: content,
    })
    if (!result) {
      return '发送验证码失败'
    }
    return '发送邮箱验证码成功，请在5分钟内输入'
  }

  /**
   * 发送激活邮件
   * @param user
   * @param activationKey
   */
  async sendActivationKeyEmail(user: User, activationKey?: string) {
    this.logger.log(
      `Started send verification email process for user ${user.email}`
    )

    if (!user.email) {
      this.logger.error('用户没有邮箱信息。')
      return
    }
    const appUrl = this.configService.get<string>('app.url')
    const url = `${appUrl}?modal=auth.reset&resetToken=${activationKey || user.activationKey}`

    const sendMailDto: SendMailDto = {
      from: {
        name: this.configService.get<string>('mail.from.name', ''),
        email: this.configService.get<string>('mail.from.email', ''),
      },
      to: {
        name: user.nicename ?? '',
        email: user.email,
      },
      subject: 'Reset your Reactive Resume password',
      message: `<p>Hey ${user.login}!</p> <p>请在30分钟内点击下面链接进行激活: <a href="${url}">${url}</a>.</p>`,
    }

    await this.sendMail(sendMailDto)
  }
}
