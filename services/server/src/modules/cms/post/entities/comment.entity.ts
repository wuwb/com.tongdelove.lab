import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { PostEntity } from './post.entity'

@Entity()
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  body: string

  @ManyToOne((type) => PostEntity, (post) => post.comments)
  post: PostEntity
}
