import { PrimaryGeneratedColumn, Column, Entity, BeforeUpdate, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { BaseEntity } from "@/shared/entities/base.entity";

@Entity('post-category')
export class PostCategoryEntity extends BaseEntity {

    @Column()
    postId: string;

    @Column()
    categoryId: string;

}
