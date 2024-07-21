import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppService } from './app.service'
// import { UserModule } from '../system/user/user.module';

describe('AppController', () => {
  let appController: AppController
  let appService: AppService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        // UserModule,
      ],
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            constructor: jest.fn(),
            root: jest.fn(),
          },
        },
      ],
    }).compile()
    appService = app.get(AppService)
    appController = app.get(AppController)
  })

  describe('root', () => {
    it('should be defined', () => {
      expect(appController).toBeDefined()
    })

    it('should return "Hello World!"', () => {
      jest.spyOn(appService, 'root').mockReturnValue('Hello World!')
      expect(appController.getRoot()).toBe('Hello World!')
    })
  })
})
