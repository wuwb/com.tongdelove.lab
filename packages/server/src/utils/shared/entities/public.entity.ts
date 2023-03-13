import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import {
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm';

export class PublicEntity extends BaseEntity {

  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    comment: '主键 id'
  })
  @ApiProperty()
  id: string;

  @Transform((row: TransformFnParams) => +new Date(row.value))
  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'created_at',
    comment: '创建时间',
    // default: () => 'CURRENT_TIMESTAMP',
  })
  @ApiProperty()
  createdAt: Date;

  @Transform((row: TransformFnParams) => +new Date(row.value))
  @UpdateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'updated_at',
    comment: '更新时间',
    // onUpdate: 'CURRENT_TIMESTAMP',
  })
  @ApiProperty()
  updatedAt: Date;

  // SOFT DELETE
  // https://github.com/typeorm/typeorm/issues/534
  @DeleteDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'deleted_at',
    select: false,
    comment: '软删除时间',
  })
  deletedAt: Date
}
