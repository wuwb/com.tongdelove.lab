import { PrimaryGeneratedColumn, Entity } from 'typeorm'

@Entity()
export class Ad {
  @PrimaryGeneratedColumn('uuid')
  id: string
}
