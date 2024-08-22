import { handlers } from '@/auth'

export const config = {
  api: {
    bodyParser: false
  }
}

export const { GET, POST } = handlers
