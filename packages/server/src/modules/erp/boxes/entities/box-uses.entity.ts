// 包装用途
import { PrimaryGeneratedColumn, Column, Entity, BeforeUpdate, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { BOX_TYPE, PAPER_TYPE, LID_TYPE, BOTTOM_TYPE, DETAIL_TYPE } from '../constact';
import { BaseEntity } from '@/shared/entities/base.entity';

// 包装
@Entity()
export class BoxUsesEntity extends BaseEntity {
}
