import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import {
    BaseEntity as BaseBaseEntity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    Column,
    VersionColumn
} from 'typeorm';

export class BaseEntity extends BaseBaseEntity {

    @PrimaryGeneratedColumn('uuid', {
        name: 'id',
        comment: '主键 id'
    })
    @ApiProperty()
    id: string;

    @Transform((row: TransformFnParams) => +new Date(row.value))
    @CreateDateColumn({
        name: 'created_at',
        comment: '创建时间',
        type: 'timestamp',
        nullable: false,
        // default: () => 'CURRENT_TIMESTAMP',
    })
    @ApiHideProperty()
    createdAt: Date | string;

    @Transform((row: TransformFnParams) => +new Date(row.value))
    @UpdateDateColumn({
        type: 'timestamp',
        comment: '更新时间',
        nullable: false,
        name: 'updated_at',
        // onUpdate: 'CURRENT_TIMESTAMP',
    })
    @ApiHideProperty()
    updatedAt: Date | string;

    // SOFT DELETE
    // https://github.com/typeorm/typeorm/issues/534
    @DeleteDateColumn({
        type: 'timestamp',
        nullable: false,
        name: 'deleted_at',
        select: false,
        comment: '软删除时间',
    })
    deletedAt: Date | string;

    @Column({ name: 'create_by', comment: '创建人', length: 30, default: '' })
    @ApiHideProperty()

    createBy?: string;

    @Column({ name: 'update_by', comment: '更新人', length: 30, default: '' })
    @ApiHideProperty()
    updateBy?: string;

    @Column({ name: 'remark', comment: '备注', default: '' })
    @IsOptional()
    @IsString()
    remark?: string;

    /* 版本号（首次插入或更新时会自增） */
    @VersionColumn({ name: 'version', comment: '版本号', select: false })
    @ApiHideProperty()
    version?: number;
}
