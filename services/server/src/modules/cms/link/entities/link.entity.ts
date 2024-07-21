import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm'

@Entity()
export class Link {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  slug: string

  @Column()
  title: string
}
