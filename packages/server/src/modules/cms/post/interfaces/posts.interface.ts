import { PostEntity } from '../entities/post.entity';
import { User } from '@/modules/system/user/interfaces/user.interface';

interface IPost {
    readonly slug: string;
    readonly title: string;
    readonly description: string;
    readonly body?: string;
    readonly tagList?: string[];
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
    readonly favorited?: boolean;
    readonly favoritesCount?: number;
    readonly author?: User;
}

export interface CommentsRO {
    comments: Comment[];
}

export interface PostRO {
    article: PostEntity;
}

export interface PostsRO {
    articles: PostEntity[];
    articlesCount: number;
}
