import { registerAs } from '@nestjs/config'

export interface SwaggerConfig {
  root: string
  enabled: boolean
  title: string
  description: string
  version: string
  path: string
  port: number
}

export default registerAs('swagger', (): SwaggerConfig => {
  return {
    root: '/docs',
    enabled: true,
    title: 'Users Restful API',
    description: 'The users Restful API description',
    version: '1.0.0',
    path: '',
    port: 3002,
  }
})
