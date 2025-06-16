import { Injectable, Logger } from '@nestjs/common'
import { TypeormService } from '../typeorm/typeorm.service'

@Injectable()
export class DatabaseService extends TypeormService { }
