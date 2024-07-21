import { Controller, Get, HttpStatus, Res } from '@nestjs/common'
import { Response } from 'express'
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('core')
@Controller('_health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: TypeOrmHealthIndicator
    // private dogHealthIndicator: DogHealthIndicator,
  ) {}

  // 当前应用的健康监测接口
  @Get('live')
  healthLive(@Res() response: Response): Response {
    return response.status(HttpStatus.NO_CONTENT).send()
  }

  // 监测其他应用的健康状态
  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com'),
      () => this.db.pingCheck('database'),
      // async () => this.dogHealthIndicator.isHealthy('dog'),
    ])
  }
}
