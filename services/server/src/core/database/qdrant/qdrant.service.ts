import { Injectable } from '@nestjs/common'
import { QdrantClient } from '@qdrant/js-client-rest'

const QDRANT_URL = ''
const QDRANT_KEY = ''

@Injectable()
export class QdrantService extends QdrantClient {
  constructor() {
    super({
      url: QDRANT_URL,
      apiKey: QDRANT_KEY,
    })
  }
}
