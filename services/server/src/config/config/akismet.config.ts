import { AkismetClientOptions } from 'akismet-api'
import { registerAs } from '@nestjs/config'

export default registerAs(
  'akismet',
  (): AkismetClientOptions => ({
    key: String(process.env.akismet_key) || 'your akismet Key',
    blog: String(process.env.akismet_blog) || 'your akismet blog site',
  })
)
