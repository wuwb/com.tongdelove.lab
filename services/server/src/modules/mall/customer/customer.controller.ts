import {
  Get,
  Param,
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Res,
  StreamableFile,
  Query,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import * as sendToWormhole from 'stream-wormhole'
import { basename, join } from 'path'
import { CastingContext, parse } from 'csv-parse'
import * as iconv from 'iconv-lite'
import { CustomerService } from './customer.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { createReadStream } from 'fs'
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'
import { Prisma } from '@prisma/client'

@ApiTags('customer')
@Controller('api/customer')
export class CustomerController {
  // 删除客户
  async delete() {}
}
