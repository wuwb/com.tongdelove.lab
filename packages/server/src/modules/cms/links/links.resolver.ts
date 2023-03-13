import { Logger, NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
// import { PubSub } from 'graphql-subscriptions';
import { LinksService } from './links.service';
import { Links, CreateOneLinksArgs, UpdateOneLinksArgs, LinksWhereInput } from '@/generated/prisma-nestjs-graphql/links';

// const pubSub = new PubSub();

@Resolver(of => Links)
export class LinksResolver {
  private readonly logger = new Logger(LinksResolver.name);

  constructor(
    private linksService: LinksService
  ) { }

  // @Query(returns => Links)
  // async recipe(@Args('id') id: string): Promise<Links> {
  //   const link = await this.linksService.findOneById(id);
  //   if (!link) {
  //     throw new NotFoundException(id);
  //   }
  //   return link;
  // }

  @Query(returns => [Links])
  async links(): Promise<Links[]> {
    this.logger.log('------------');
    const links = await this.linksService.findAll({});
    this.logger.log(links);
    return links;
  }

  // @Mutation(returns => Links)
  // async addLinks(
  //   @Args('newLinksData') newLinksData,
  // ): Promise<Links> {
  //   const link = await this.linksService.create(newLinksData);
  //   // pubSub.publish('recipeAdded', { recipeAdded: recipe });
  //   return link;
  // }

  // @Mutation(returns => Boolean)
  // async removeLinks(@Args('id') id: string) {
  //   return this.linksService.remove(id);
  // }

  // @Subscription(returns => Links)
  // recipeAdded() {
  //   return pubSub.asyncIterator('recipeAdded');
  // }
}
