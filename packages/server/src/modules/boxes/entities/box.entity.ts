import { PrimaryGeneratedColumn, Column, Entity, BeforeUpdate, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { BOX_TYPE, PAPER_TYPE, LID_TYPE, BOTTOM_TYPE, DETAIL_TYPE } from '../constact';
import { PublicEntity } from '@/utils/shared/entities/public.entity';

// 包装
@Entity()
export class BoxEntity extends PublicEntity {

  @Column({
    type: 'enum',
    enum: BOX_TYPE,
    comment: '盒子类型',
  })
  boxType: BOX_TYPE;

  @Column({
    type: 'enum',
    enum: PAPER_TYPE,
    comment: '纸张类型',
  })
  paperType: PAPER_TYPE;

  @Column({
    type: 'enum',
    enum: LID_TYPE,
    comment: '盒盖类型',
  })
  lidType: number;

  @Column({
    type: 'enum',
    enum: BOTTOM_TYPE,
    comment: '盒底部类型',
  })
  bottomType: number;

  @Column({
    type: 'enum',
    enum: DETAIL_TYPE,
    comment: '细节类型',
  })
  detailType: number;

  @Column({
    comment: '盒子名称',
  })
  title: string; // 根据前面 4 个属性计算得出

  @BeforeUpdate()
  updateName() {
    this.title = `${this.boxType}_${this.lidType}_${this.detailType}_${this.bottomType}`;
  }

  // 添加三张图片
  @Column({
    type: 'simple-array',
    comment: '三张主图',
  })
  imgList: string[];

  @Column({
    default: 0,
    comment: '销量',
  })
  salesCount: number;
}
