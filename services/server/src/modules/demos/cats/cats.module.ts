import { Module } from '@nestjs/common'
import { CatsController } from './cats.controller'
import { CatsService } from './cats.service'
import { CatsResolvers } from './cats.resolvers'
import { catsProviders } from './cats.providers'
import { CatHealthIndicator } from './cat.health'

@Module({
  controllers: [CatsController],
  providers: [CatsService, CatsResolvers, ...catsProviders],
  exports: [CatHealthIndicator],
})
export class CatsModule {}
