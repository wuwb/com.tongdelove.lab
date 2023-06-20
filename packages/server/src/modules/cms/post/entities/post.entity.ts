import { PrimaryGeneratedColumn, Column, Entity, BeforeUpdate, ManyToOne, OneToMany, JoinColumn, Index } from "typeorm";
import { UserEntity } from '@/modules/system/user/entities/user.entity';
import { CommentEntity } from './comment.entity';
import { BaseEntity } from "@/shared/entities/base.entity";

@Index('post_id', ['id'], { unique: true }) // 创建索引https://typeorm.io/#/indices，https://typeorm.biunav.com/zh/indices.html#%E8%81%94%E5%90%88%E7%B4%A2%E5%BC%95
@Entity()
export class PostEntity extends BaseEntity {

    @Column()
    slug: string;

    @Column()
    title: string;

    @Column({ type: 'text' })
    keyword: string;

    @Column({ default: '' })
    description: string;

    @Column({ default: '' })
    content: string;

    @Column()
    status: boolean;

    @Column('simple-array')
    tagList: string[];

    @ManyToOne(type => UserEntity, data => data.posts)
    author: UserEntity;

    @OneToMany(type => CommentEntity, data => data.post, { eager: true })
    @JoinColumn()
    comments: CommentEntity[];

    @Column({ default: 0 })
    favoriteCount: number;

    @Column('int', {
        name: 'audit',
        comment: '是否通过审核', // 0 未通过、1 通过
        width: 1,
        default: () => "'0'",
    })
    audit: boolean;
}
