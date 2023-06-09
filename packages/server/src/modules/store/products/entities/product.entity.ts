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
import { BaseEntity } from '@/common/entities/base.entity';

@Entity('product')
export class Product extends BaseEntity implements Prisma.ProductUncheckedCreateInput {

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

    slug: string;
    code: string;
    flag: number;
    custom_id: string;

    goods_sn;
    isDeleted;
    keywords;
    brief;
    detail;

    content;
    image;
    published_at;
    biz_type;
}
