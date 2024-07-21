import { Injectable, Logger } from '@nestjs/common'
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'
import { TypeormService } from '../typeorm/typeorm.service'

@Injectable()
export class DatabaseService extends TypeormService {}
