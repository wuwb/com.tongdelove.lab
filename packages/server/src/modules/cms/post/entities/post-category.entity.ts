import { PrimaryGeneratedColumn, Column, Entity, BeforeUpdate, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { PublicEntity } from "@/utils/shared/entities/public.entity";

@Entity('post-category')
export class PostCategoryEntity extends PublicEntity {

  @Column()
  postId: string;

  @Column()
  categoryId: string;

}
