import { PrimaryGeneratedColumn, Column, Entity, BeforeUpdate, ManyToOne, OneToMany, JoinColumn, Tree, TreeChildren, TreeParent, } from "typeorm";
import { BaseEntity } from "@/shared/entities/base.entity";

/**
 * 新闻报道只是一种分类
 */
@Entity()
export class CategoryEntity extends BaseEntity {
    @Column()
    label: string;

    @Column()
    value: string;

    @Column()
    order: number;

    @Column({
        comment: '只显示子级分类文章',
        default: false,
    })
    onlyChild: boolean;

    @TreeChildren()
    children: CategoryEntity[];

    @TreeParent()
    parent: CategoryEntity;
}
