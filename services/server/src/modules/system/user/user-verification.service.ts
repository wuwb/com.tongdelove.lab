import {
  Injectable,
  HttpException,
  Logger,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common'
import { eq } from 'drizzle-orm'
import { randomBytes } from 'crypto'
import { MailService } from '@/core/mail/mail/mail.service'
import { UserService } from './user.service'
import { ConfigService } from '@nestjs/config'
import { SendMailDto } from '@/core/mail/mail/dto/send-mail.dto'
import { DrizzleService } from '@/core/database/drizzle/drizzle.service'
import { users } from '@/core/database/drizzle/schema'

@Injectable()
export class UserVerificationService {
  private readonly logger = new Logger(UserVerificationService.name)

  constructor(
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
    private readonly userService: UserService,
    private readonly drizzle: DrizzleService
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
    if (user.userStatus) {
      this.logger.log(
        `User ${userId} is already verified, not sending verify email`
      )
      return
    }
    await this.mailService.sendActivationKeyEmail(user as any)
  }

  async sendForgotPasswordEmail(user: any, resetToken: string): Promise<void> {
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
        name: user.userNicename ?? '',
        email: user.email,
      },
      subject: 'Reset your Reactive Resume password',
      message: `<p>Hey ${user.userNicename}!</p> <p>You can reset your password by visiting this link: <a href="${url}">${url}</a>.</p> <p>But hurry, because it will expire in 30 minutes.</p>`,
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
          await this.drizzle.db
            .update(users)
            .set({ userResetKey: null })
            .where(eq(users.id, user.id))
        },
        30 * 60 * 1000
      )

      try {
        await this.drizzle.db
          .update(users)
          .set({ userResetKey: resetKey })
          .where(eq(users.id, user.id))

        // this.schedulerRegistry.addTimeout(`clear-resetToken-${user.id}`, timeout);

        await this.sendForgotPasswordEmail(user, resetKey)
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
