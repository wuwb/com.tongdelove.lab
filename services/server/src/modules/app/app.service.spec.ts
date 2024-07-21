import { LoggerService } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock'
import { AppService } from './app.service'
import { AppController } from './app.controller'

describe('AppService', () => {
  let appController: AppController
  let appService: AppService

  afterAll(() => {})

  afterEach(() => {})

  beforeAll(() => {})

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile()

    appController = app.get(AppController)
    appService = app.get(AppService)
  })

  describe('app service', () => {
    it('should be defined', () => {
      expect(appService).toBeDefined()
    })

    it('getHello', async () => {
      const result = appService.root()
      expect(result).toEqual('Hello World!')
    })
  })
})
