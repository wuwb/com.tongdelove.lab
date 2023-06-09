import { Column, Entity, Unique, Index } from 'typeorm';
import { BaseEntity } from '@/common/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('role')
@Unique('name_deleted', ['name', 'deletedAt'])
export class RoleEntity extends BaseEntity {

    @Index()
    @Column({
        type: 'varchar',
        nullable: false,
        length: 50,
        unique: true,
        name: 'name',
        comment: '角色名称',
    })
    @ApiProperty()
    name: string;

    @Column({
        type: 'varchar',
        nullable: true,
        length: 100,
        name: 'description',
        comment: '角色描素',
    })
    description: string;

    @Column({ unique: true })
    @ApiProperty()
    value: string;

    @Column({ nullable: true })
    @ApiProperty()
    remark: string;

    @Column({
        type: 'tinyint',
        nullable: true,
        default: () => '1',
        name: 'status',
        comment: '状态1表示正常,0表示不正常',
    })
    @ApiProperty()
    status: number;

    @Column({
        type: 'tinyint',
        nullable: true,
        default: () => 0,
        name: 'is_default',
        comment: '针对后期提供注册用,1表示默认角色,0表示非默认角色',
    })
    @ApiProperty()
    isDefault: number;
}
