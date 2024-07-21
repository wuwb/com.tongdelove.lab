import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { CommandHandlers } from './commands/handlers'
import { EventHandlers } from './events/handlers'
import { HeroesGameController } from './heroes.controller'
import { HeroesGameService } from './heroes.service'
import { QueryHandlers } from './queries/handlers'
import { HeroRepository } from './repository/hero.repository'
import { HeroesGameSagas } from './sagas/heroes.sagas'

@Module({
  imports: [CqrsModule],
  controllers: [HeroesGameController],
  providers: [
    HeroesGameService,
    HeroesGameSagas,
    HeroRepository,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ],
})
export class HeroesGameModule {}
