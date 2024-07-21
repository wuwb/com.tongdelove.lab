import { registerAs } from '@nestjs/config'

export default registerAs('mail', () => ({
  from: {
    name: process.env.MAIL_FROM_NAME || 'WuWenbin',
    email: process.env.MAIL_FROM_EMAIL || 'i@printlake.com',
  },
  to: [],
  cc: [],
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secureConnection: true,
  username: process.env.MAIL_USERNAME,
  password: process.env.MAIL_PASSWORD || 'your email password',

  // test
  account: process.env.email_account || 'your email address.',
  admin: '541330190@qq.com',
}))
