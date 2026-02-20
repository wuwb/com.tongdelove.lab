import { PostEntity } from './post.entity'

export class CommentEntity {
  id: string

  body: string

  post: PostEntity
}
