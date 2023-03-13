import { Injectable } from '@nestjs/common';
import { CreateProductsGqlInput } from './dto/create-products-gql.input';
import { UpdateProductsGqlInput } from './dto/update-products-gql.input';

@Injectable()
export class ProductsGqlService {
  create(createProductsGqlInput: CreateProductsGqlInput) {
    return 'This action adds a new productsGql';
  }

  findAll() {
    return `This action returns all productsGql`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productsGql`;
  }

  update(id: number, updateProductsGqlInput: UpdateProductsGqlInput) {
    return `This action updates a #${id} productsGql`;
  }

  remove(id: number) {
    return `This action removes a #${id} productsGql`;
  }
}
