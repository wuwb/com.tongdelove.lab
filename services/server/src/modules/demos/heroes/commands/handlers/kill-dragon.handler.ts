import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs'
import * as clc from 'cli-color'
import { HeroRepository } from '../../repository/hero.repository'
import { KillDragonCommand } from '../impl/kill-dragon.command'

@CommandHandler(KillDragonCommand)
export class KillDragonHandler implements ICommandHandler<KillDragonCommand> {
  constructor(
    private readonly repository: HeroRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: KillDragonCommand) {
    console.log(clc.greenBright('KillDragonCommand...'))

    const { heroId, dragonId } = command
    // 发布事件，在 models 触发事件
    const hero = this.publisher.mergeObjectContext(
      await this.repository.findOneById(heroId)
    )
    hero.killEnemy(dragonId)
    hero.commit()

    // const hero = this.repository.findOneById(+heroId);
    // hero.killEnemy(dragonId);
    // await this.repository.persist(hero);
  }
}
