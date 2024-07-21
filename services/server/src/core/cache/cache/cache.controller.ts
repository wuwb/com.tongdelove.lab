import { Controller } from '@nestjs/common'
import { CacheService } from './cache.service'

@Controller('redis')
export class CacheController {
  constructor(private readonly redisService: CacheService) {}
}
