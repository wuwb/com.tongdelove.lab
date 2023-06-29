import { Injectable } from '@nestjs/common';
import {
  ClientProxyFactory,
  Transport,
  ClientProxy
} from '@nestjs/microservices';
// import { LoggerService } from './logger/logger.service';

@Injectable()
export class AppService {
  private client: ClientProxy;

  constructor(
    // @Logger('AppService') private logger: LoggerService
  ) {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        port: 4000
      }
    });
  }

  root(): string {
    return 'Hello World!';
  }
}
