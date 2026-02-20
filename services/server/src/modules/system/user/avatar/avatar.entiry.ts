export class Avatar {
  id: string

  filename: string

  mimetype: string

  // @ManyToOne(type => User, user => user.avatar, { nullable: false })
  // user: User;
}
