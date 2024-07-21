import { InputType, Int, Field } from '@nestjs/graphql'

@InputType()
export class CreateProductsGqlInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  id: number
}
