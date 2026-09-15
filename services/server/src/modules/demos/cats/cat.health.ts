import { Injectable } from '@nestjs/common'
import { CatsService } from './cats.service'
import {
  HealthIndicatorResult,
  HealthIndicatorService,
} from '@nestjs/terminus'

@Injectable()
export class CatHealthIndicator {
  constructor(
    private readonly catsService: CatsService,
    private readonly healthIndicatorService: HealthIndicatorService
  ) {}

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    const cats = await this.catsService.findAll()
    const badboys = cats.filter((dog) => dog.age > 3)
    const isHealthy = badboys.length === 0

    // Terminus 12 起，不再继承 HealthIndicator 基类，改为通过
    // HealthIndicatorService 创建检查会话，up/down 即表达健康状态。
    const indicator = this.healthIndicatorService.check(key)

    if (isHealthy) {
      return indicator.up({ badboys: badboys.length })
    }
    return indicator.down({ badboys: badboys.length })
  }
}
