
import { Global, Module } from '@nestjs/common';
import { GraphqlService } from './graphql.service';

@Module({
  providers: [
    GraphqlService
  ],
  exports: [
    GraphqlService
  ]
})
export class GraphQLModule { }
