import { Resolver } from 'dns'
import { Query } from '@nestjs/common'
// import { Args, ResolveProperty, Parent, Mutation, Subscription } from '@nestjs/graphql';
// import { PubSub } from 'graphql-subscriptions';
import { AuthorsService } from './authors.service'
import { PostService } from '../post/post.service'

// const pubSub = new PubSub();

// @Resolver('Author')
export class AuthorResolver {
  constructor(
    private readonly authorsService: AuthorsService,
    private readonly postService: PostService
  ) {}

  // @Query('author')
  // async getAuthor(@Args('id') id: string) {
  //     return this.authorsService.findOneById(id);
  // }

  // @Mutation()
  // async upvotePost(@Args('postId') postId: string) {
  //     return this.postService.upvoteById({ id: postId });
  // }

  // @ResolveProperty('post')
  // async getPosts(@Parent() author) {
  //     const { id } = author;
  //     return this.postService.findAll({ authorId: id });
  // }

  // @Subscription()
  // commentAdded() {
  //     return {
  //         subscribe: () => pubSub.asyncIterator('commentAdded'),
  //     };
  // }
}
