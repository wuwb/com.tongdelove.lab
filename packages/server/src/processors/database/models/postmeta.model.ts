import { Entity, PrimaryColumn, Column } from 'typeorm';

// CREATE TABLE `wp_postmeta` (
//     `meta_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
//     `post_id` bigint(20) unsigned NOT NULL DEFAULT 0,
//     `meta_key` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
//     `meta_value` longtext COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
//     PRIMARY KEY (`meta_id`),
//     KEY `post_id` (`post_id`),
//     KEY `meta_key` (`meta_key`(191))
// ) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

@Entity({ name: 'comments' })
export class Comment {
    @PrimaryColumn('uuid', {})
    meta_id: string;

    @Column()
    comment_post_ID: string;
}
