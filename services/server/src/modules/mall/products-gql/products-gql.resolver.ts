import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductsGqlService } from './products-gql.service';
import { ProductsGql } from './entities/products-gql.entity';
import { CreateProductsGqlInput } from './dto/create-products-gql.input';
import { UpdateProductsGqlInput } from './dto/update-products-gql.input';

@Resolver(() => ProductsGql)
export class ProductsGqlResolver {
  constructor(private readonly productsGqlService: ProductsGqlService) { }

  @Mutation(() => ProductsGql)
  createProductsGql(@Args('createProductsGqlInput') createProductsGqlInput: CreateProductsGqlInput) {
    return this.productsGqlService.create(createProductsGqlInput);
  }

  @Query(() => [ProductsGql], { name: 'productsGql' })
  findAll() {
    return this.productsGqlService.findAll();
  }

  @Query(() => ProductsGql, { name: 'productsGql' })
  findOne(@Args('id') id: string) {
    return this.productsGqlService.findOne(+id);
  }

  @Mutation(() => ProductsGql)
  updateProductsGql(@Args('updateProductsGqlInput') updateProductsGqlInput: UpdateProductsGqlInput) {
    return this.productsGqlService.update(updateProductsGqlInput.id, updateProductsGqlInput);
  }

  @Mutation(() => ProductsGql)
  removeProductsGql(@Args('id') id: string) {
    return this.productsGqlService.remove(+id);
  }
}
