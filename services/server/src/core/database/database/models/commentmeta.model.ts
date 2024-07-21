import { Entity, PrimaryColumn, Column } from 'typeorm'

// CREATE TABLE `wp_commentmeta` (
//     `meta_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
//     `comment_id` bigint(20) unsigned NOT NULL DEFAULT 0,
//     `meta_key` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
//     `meta_value` longtext COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
//     PRIMARY KEY (`meta_id`),
//     KEY `comment_id` (`comment_id`),
//     KEY `meta_key` (`meta_key`(191))
// ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

@Entity({ name: 'comments' })
export class Comment {
  @PrimaryColumn('uuid')
  comment_ID: string

  @Column()
  comment_post_ID: string
}
