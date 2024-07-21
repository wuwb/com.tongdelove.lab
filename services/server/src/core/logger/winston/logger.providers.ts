// src/logger/logger.provider.ts

import { Provider } from '@nestjs/common'
import { prefixesForLoggers } from './logger.decorator'
import { MyLoggerService } from './logger.service'

function loggerFactory(logger: MyLoggerService, prefix: string) {
  return logger
}

function createLoggerProvider(prefix: string): Provider<MyLoggerService> {
  return {
    provide: `MyLogger${prefix}`,
    useFactory: (logger) => loggerFactory(logger, prefix),
    inject: [MyLoggerService],
  }
}

export function createLoggerProviders(): Array<Provider<MyLoggerService>> {
  return prefixesForLoggers.map((prefix) => createLoggerProvider(prefix))
}
