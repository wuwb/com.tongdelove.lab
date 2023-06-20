import { Entity, Unique, Column } from 'typeorm';
import { BaseEntity } from '@/shared/entities/base.entity';

@Entity('role_access')
@Unique('role_access_type_deleted', ['roleId', 'accessId', 'type', 'deletedAt'])
export class RoleAccessEntity extends BaseEntity {
    @Column({
        type: 'int',
        nullable: false,
        name: 'role_id',
        comment: '角色id'
    })
    roleId: string;

    @Column({
        type: 'int',
        nullable: false,
        name: 'access_id',
        comment: '资源id'
    })
    accessId: string;

    @Column({
        type: 'tinyint',
        name: 'type',
        comment: '资源类型:2:表示菜单,3:表示接口(API)'
    })
    type: number;
}
