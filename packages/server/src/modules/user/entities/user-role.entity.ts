import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { PublicEntity } from '@/utils/shared/entities/public.entity';

@Entity({ name: 'user_role' })
export default class UserRole extends PublicEntity {

    @Column({ name: 'user_id' })
    @ApiProperty()
    userId: string;

    @Column({ name: 'role_id' })
    @ApiProperty()
    roleId: string;
}
