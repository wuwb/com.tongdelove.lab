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

@Entity()
export class CommoditiesPrice {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  type: string

  @Column()
  time: Date

  @Column()
  price: number

  @Column()
  change: number

  @Column({ name: 'create_at' })
  createdAt: string

  @Column({ name: 'update_at' })
  updatedAt: string
}
