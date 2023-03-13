import {
  Entity,
  Column,
  Unique,
  Index,
  BeforeInsert,
  BeforeUpdate,
  AfterLoad,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { PublicEntity } from '@/utils/shared/entities/public.entity';

@Entity('product')
export class Product extends PublicEntity {

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty({ required: false, nullable: true })
  @Column({
    type: 'varchar',
  })
  description: string;

  @Transform(({ value }) => value.toNumber())
  @ApiProperty({ type: String })
  @Column()
  price: number;

  @ApiProperty()
  @Column()
  sku: string;

  @ApiProperty({ default: false })
  @Column()
  published: boolean;
}
