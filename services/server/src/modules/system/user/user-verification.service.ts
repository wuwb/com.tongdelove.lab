import {
  Injectable,
  HttpException,
  Logger,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common'
import { User, Prisma } from '@prisma/client'
import { MailService } from '@/core/mail/mail/mail.service'
import { UserService } from './user.service'
import { ConfigService } from '@nestjs/config'
import { SendMailDto } from '@/core/mail/mail/dto/send-mail.dto'
import { randomBytes } from 'crypto'
import { PrismaService } from '@/core/database/prisma/prisma.service'

@Injectable()
export class UserVerificationService {
  private readonly logger = new Logger(UserVerificationService.name)

  constructor(
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
    private readonly userService: UserService,
    private readonly prisma: PrismaService
  ) {}

  async resendVerificationEmail(userId: string) {
    const user = await this.userService.get({
      where: { id: userId },
    })
    if (!user) {
      this.logger.log(`User ${userId} not found`)
      throw new Error('USER_NOT_FOUND')
    }
    // 已经验证的状态
    if (user.status) {
      this.logger.log(
        `User ${userId} is already verified, not sending verify email`
      )
      return
    }
    await this.mailService.sendActivationKeyEmail(user)
  }

  async sendForgotPasswordEmail(user: User, resetToken: string): Promise<void> {
    const appUrl = this.configService.get<string>('app.url')
    const url = `${appUrl}?modal=auth.reset&resetToken=${resetToken}`

    if (!user.email) {
      throw new Error('用户没有邮箱信息，无法发送邮件。')
    }

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
      message: `<p>Hey ${user.nicename}!</p> <p>You can reset your password by visiting this link: <a href="${url}">${url}</a>.</p> <p>But hurry, because it will expire in 30 minutes.</p>`,
    }

    await this.mailService.sendMail(sendMailDto)
  }

  async generateResetKey(email: string): Promise<void> {
    try {
      const user = await this.userService.findByEmail(email)
      let undefinedRestKey
      const resetKey = randomBytes(32).toString('hex')

      const timeout = setTimeout(
        async () => {
          await this.prisma.user.update({
            where: {
              id: user.id,
            },
            data: {
              resetKey: undefinedRestKey,
            },
          })
        },
        30 * 60 * 1000
      )

      try {
        await this.prisma.$transaction(async (prisma) => {
          await this.prisma.user.update({
            where: {
              id: user.id,
            },
            data: {
              resetKey,
            },
          })

          // this.schedulerRegistry.addTimeout(`clear-resetToken-${user.id}`, timeout);

          await this.sendForgotPasswordEmail(user, resetKey)
        })
      } catch (err) {
        // Handle the rollback...
        throw new HttpException(
          'Please wait at least 30 minutes before resetting your password again.',
          HttpStatus.TOO_MANY_REQUESTS
        )
      }
    } catch (err) {
      // pass through
    }
  }
}
