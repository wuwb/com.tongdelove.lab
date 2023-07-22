import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import {
    BaseEntity as TypeormBaseEntity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    Column,
    VersionColumn
} from 'typeorm';

export class BaseEntity extends TypeormBaseEntity {

    @PrimaryGeneratedColumn('uuid', {
        name: 'id',
        comment: '主键 id'
    })
    @ApiProperty()
    id: string;

    // SOFT DELETE
    // https://github.com/typeorm/typeorm/issues/534
    @Column({
        unsigned: true,
        nullable: false,
        name: 'is_deleted',
        select: false,
        comment: '软删除时间',
        default: () => false
    })
    isDeleted: boolean;

    @Column({ 
        name: 'created_by', 
        comment: '创建人', 
        length: 30, 
        default: '' 
    })
    @ApiHideProperty()
    createdBy?: string;

    @Column({ 
        name: 'updated_by', 
        comment: '更新人', 
        length: 30, 
        default: '' 
    })
    @ApiHideProperty()
    updatedBy?: string;

    @Transform((row: TransformFnParams) => +new Date(row.value))
    @CreateDateColumn({
        name: 'created_at',
        comment: '创建时间',
        type: 'timestamp',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
    })
    @ApiHideProperty()
    createdAt: Date;

    @Transform((row: TransformFnParams) => +new Date(row.value))
    @UpdateDateColumn({
        type: 'timestamp',
        comment: '更新时间',
        nullable: false,
        name: 'updated_at',
        onUpdate: 'CURRENT_TIMESTAMP',
        default: () => 'CURRENT_TIMESTAMP',
    })
    @ApiHideProperty()
    updatedAt: Date;

    @Column({ name: 'remark', comment: '备注', default: '' })
    @IsOptional()
    @IsString()
    remark?: string;

    /* 版本号（首次插入或更新时会自增） */
    @VersionColumn({ name: 'version', comment: '版本号', select: false })
    @ApiHideProperty()
    version?: number;
}
