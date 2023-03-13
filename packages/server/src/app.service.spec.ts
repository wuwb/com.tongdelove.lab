import { LoggerService } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let logger: LoggerService;
  let service: AppService;

  afterAll(() => { });

  afterEach(() => { });

  beforeAll(() => { });

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: 'LoggerServiceAppService',
          useValue: {
            constructor: jest.fn(),
            log: jest.fn()
          }
        }
      ],
    })
      .compile();

    service = app.get<AppService>(AppService);
    logger = app.get<LoggerService>('LoggerServiceAppService');
  });

  describe('app service', () => {

    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('getHello', async () => {
      jest.spyOn(logger, "log").mockImplementation((message: string) => {
        console.log(message);
      })
      const result = service.root();
      expect(result).toEqual('Hello World!');
      expect(logger.log).toBeCalledWith("Hello World");
    })
  });

});
