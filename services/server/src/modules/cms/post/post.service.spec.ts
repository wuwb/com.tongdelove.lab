import { Test, TestingModule } from '@nestjs/testing'
import { PostService } from './post.service'

describe('TopicsService', () => {
  let service: PostService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostService],
    }).compile()

    service = module.get<PostService>(PostService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('post', () => {
    service.post({
      id: '1',
    })
  })
})
