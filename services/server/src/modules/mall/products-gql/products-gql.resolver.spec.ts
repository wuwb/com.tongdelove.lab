import { Test, TestingModule } from '@nestjs/testing';
import { ProductsGqlResolver } from './products-gql.resolver';
import { ProductsGqlService } from './products-gql.service';

describe('ProductsGqlResolver', () => {
  let resolver: ProductsGqlResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsGqlResolver, ProductsGqlService],
    }).compile();

    resolver = module.get<ProductsGqlResolver>(ProductsGqlResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
