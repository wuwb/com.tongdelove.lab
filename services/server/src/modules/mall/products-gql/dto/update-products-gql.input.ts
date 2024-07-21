import { CreateProductsGqlInput } from './create-products-gql.input'
import { InputType, Field, Int, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateProductsGqlInput extends PartialType(
  CreateProductsGqlInput
) {
  @Field(() => Int)
  id: number
}
