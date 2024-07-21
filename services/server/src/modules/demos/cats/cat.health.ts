import { Injectable } from '@nestjs/common'
import { CatsService } from './cats.service'
import {
  HealthIndicatorResult,
  HealthIndicator,
  HealthCheckError,
} from '@nestjs/terminus'

@Injectable()
export class CatHealthIndicator extends HealthIndicator {
  constructor(private readonly catsService: CatsService) {
    super()
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    const cats = await this.catsService.findAll()
    const badboys = cats.filter((dog) => dog.age > 3)
    const isHealthy = badboys.length === 0
    const result = this.getStatus(key, isHealthy, { badboys: badboys.length })

    if (isHealthy) {
      return result
    }
    throw new HealthCheckError('Cat check failed', result)
  }
}
