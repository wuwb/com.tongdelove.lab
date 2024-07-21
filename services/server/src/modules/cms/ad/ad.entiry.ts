import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  BeforeUpdate,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm'

@Entity()
export class Ad {
  @PrimaryGeneratedColumn('uuid')
  id: string
}
