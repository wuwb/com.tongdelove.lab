import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Topic {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 500 })
  name: string

  @Column('text')
  description: string

  @Column()
  category: string

  @Column()
  relate_topics: string

  @Column()
  filename: string

  @Column('int')
  views: number

  @Column()
  isPublished: boolean
}
