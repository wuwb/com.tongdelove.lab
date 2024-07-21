import {
  PrimaryGeneratedColumn,
  PrimaryColumn,
  Column,
  Entity,
  BeforeUpdate,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm'

enum CommoditiesCategoryEnum {
  ETF,
  Metal,
  Agricultural,
}

@Entity()
export class Commodities {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  enName: string

  @Column({
    type: 'enum',
    enum: [CommoditiesCategoryEnum.ETF],
    enumName: 'CommoditiesCategoryEnum',
    default: `'${CommoditiesCategoryEnum.ETF}'`,
  })
  category: number

  @Column({ name: 'create_at' })
  createdAt: string

  @Column({ name: 'update_at' })
  updatedAt: string
}
