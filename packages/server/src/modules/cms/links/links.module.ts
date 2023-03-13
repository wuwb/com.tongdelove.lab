import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinksController } from './links.controller';
import { LinksService } from './links.service';
import { LinksResolver } from './links.resolver';
import { Link } from './entities/link.entity';
import { PrismaService } from '@/processors/prisma/prisma.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Link,
    ]),
  ],
  controllers: [
    LinksController
  ],
  providers: [
    LinksResolver,
    LinksService,
    PrismaService,
  ],
  exports: [
    LinksService
  ],
})
export class LinksModule { }
