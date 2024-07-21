import { Test, TestingModule } from '@nestjs/testing'
import { ProductsGqlService } from './products-gql.service'

describe('ProductsGqlService', () => {
  let service: ProductsGqlService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsGqlService],
    }).compile()

    service = module.get<ProductsGqlService>(ProductsGqlService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
