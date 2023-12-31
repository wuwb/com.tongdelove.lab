import { Logger, NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
// import { PubSub } from 'graphql-subscriptions';
import { LinkService } from './link.service';
import { Website, CreateOneWebsiteArgs, UpdateOneWebsiteArgs, WebsiteWhereInput } from '@/generated/prisma-nestjs-graphql/website';


// const pubSub = new PubSub();

@Resolver(of => Website)
export class LinkResolver {
    private readonly logger = new Logger(LinkResolver.name);

    constructor(
        private linkService: LinkService
    ) { }

    // @Query(returns => Website)
    // async recipe(@Args('id') id: string): Promise<Website> {
    //   const link = await this.linkService.findOneById(id);
    //   if (!link) {
    //     throw new NotFoundException(id);
    //   }
    //   return link;
    // }

    @Query(returns => [Website])
    async links(): Promise<Website[]> {
        this.logger.log('------------');
        const links = await this.linkService.findAll({});
        this.logger.log(links);
        return links;
    }

    // @Mutation(returns => Website)
    // async addWebsite(
    //   @Args('newWebsiteData') newWebsiteData,
    // ): Promise<Website> {
    //   const link = await this.linkService.create(newWebsiteData);
    //   // pubSub.publish('recipeAdded', { recipeAdded: recipe });
    //   return link;
    // }

    // @Mutation(returns => Boolean)
    // async removeWebsite(@Args('id') id: string) {
    //   return this.linkService.remove(id);
    // }

    // @Subscription(returns => Website)
    // recipeAdded() {
    //   return pubSub.asyncIterator('recipeAdded');
    // }
}
