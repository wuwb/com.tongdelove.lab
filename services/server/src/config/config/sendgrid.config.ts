import { registerAs } from '@nestjs/config'

export default registerAs('sendgrid', () => ({
  apiKey: process.env.SENDGRID_API_KEY || 'SG.test',
  apiKeySecretName: process.env.SENDGRID_API_KEY_SECRET_NAME,
  apiKeySecret: process.env.SENDGRID_API_KEY_SECRET,
}))
