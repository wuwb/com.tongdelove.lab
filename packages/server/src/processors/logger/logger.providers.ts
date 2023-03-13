// src/logger/logger.provider.ts

import { Provider } from '@nestjs/common';
import { prefixesForLoggers } from './logger.decorator';
import { MyLogger } from './logger.service';

function loggerFactory(logger: MyLogger, prefix: string) {
  return logger;
}

function createLoggerProvider(prefix: string): Provider<MyLogger> {
  return {
    provide: `MyLogger${prefix}`,
    useFactory: logger => loggerFactory(logger, prefix),
    inject: [MyLogger],
  };
}

export function createLoggerProviders(): Array<Provider<MyLogger>> {
  return prefixesForLoggers.map(prefix => createLoggerProvider(prefix));
}
