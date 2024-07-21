import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType({
  description: 'product ',
})
export class ProductsGql {
  @Field(() => Int, {
    description: 'id',
  })
  id: number
}
