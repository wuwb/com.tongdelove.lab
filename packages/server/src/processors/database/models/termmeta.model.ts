import { Entity, PrimaryColumn, Column } from 'typeorm';

// CREATE TABLE `wp_termmeta` (
//     `meta_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
//     `term_id` bigint(20) unsigned NOT NULL DEFAULT 0,
//     `meta_key` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
//     `meta_value` longtext COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
//     PRIMARY KEY (`meta_id`),
//     KEY `term_id` (`term_id`),
//     KEY `meta_key` (`meta_key`(191))
// ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

@Entity({ name: 'comments' })
export class Comment {
    @PrimaryColumn({ type: 'bigint' })
    comment_ID: string;

    @Column()
    comment_post_ID: string;
}
