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
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  avatar_url: string

  @Column()
  description: string

  @Column()
  name: string

  @Column()
  download_url: string

  @Column()
  source_url: string

  @Column()
  url: string

  @Column()
  category: string

  @Column()
  platform: string

  @Column()
  recommend: boolean

  @Column({ name: 'create_at' })
  createdAt: string

  @Column({ name: 'update_at' })
  updatedAt: string
}
