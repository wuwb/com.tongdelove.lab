import { Test, TestingModule } from '@nestjs/testing';
import { MyLogger } from './logger.service';

describe('MyLogger', () => {
  let service: MyLogger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MyLogger],
    }).compile();

    service = await module.resolve<MyLogger>(MyLogger);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('log', () => {
    const consoleSpy = jest.spyOn(global.console, 'log');
    service.log("hello", {});
    expect(consoleSpy).toBeCalledWith('hello');
  });

  it('log with prefix', () => {
    const consoleSpy = jest.spyOn(global.console, 'log');
    service.log("hello", {});
    expect(consoleSpy).toBeCalledWith('[H] hello');
  });
});
