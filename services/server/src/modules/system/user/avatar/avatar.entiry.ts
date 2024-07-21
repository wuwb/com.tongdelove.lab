import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
// import { User } from './user/user.entity';

@Entity()
export class Avatar {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  filename: string

  @Column()
  mimetype: string

  // @ManyToOne(type => User, user => user.avatar, { nullable: false })
  // user: User;
}
