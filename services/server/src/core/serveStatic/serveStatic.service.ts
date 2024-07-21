import { Injectable } from '@nestjs/common'
import { ServeStaticModule as ServeStaticModuleBase } from '@nestjs/serve-static'

@Injectable()
export class ServeStaticModule extends ServeStaticModuleBase {}
