import { Logger, NotFoundException } from '@nestjs/common'
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'
// import { PubSub } from 'graphql-subscriptions';
import { LinkService } from './link.service'

// const pubSub = new PubSub();

export class LinkResolver {
  private readonly logger = new Logger(LinkResolver.name)

  constructor(private linkService: LinkService) {}

  // @Query(returns => Link)
  // async recipe(@Args('id') id: string): Promise<Link> {
  //   const link = await this.linkService.findOneById(id);
  //   if (!link) {
  //     throw new NotFoundException(id);
  //   }
  //   return link;
  // }

  async links() {
    this.logger.log('------------')
    const links = await this.linkService.findAll({})
    this.logger.log(links)
    return links
  }

  // @Mutation(returns => Link)
  // async addLink(
  //   @Args('newLinkData') newLinkData,
  // ): Promise<Link> {
  //   const link = await this.linkService.create(newLinkData);
  //   // pubSub.publish('recipeAdded', { recipeAdded: recipe });
  //   return link;
  // }

  // @Mutation(returns => Boolean)
  // async removeLink(@Args('id') id: string) {
  //   return this.linkService.remove(id);
  // }

  // @Subscription(returns => Link)
  // recipeAdded() {
  //   return pubSub.asyncIterator('recipeAdded');
  // }
}
