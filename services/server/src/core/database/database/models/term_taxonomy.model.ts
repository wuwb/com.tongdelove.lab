import { Entity, PrimaryColumn, Column } from 'typeorm'

// CREATE TABLE `wp_term_taxonomy` (
//     `term_taxonomy_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
//     `term_id` bigint(20) unsigned NOT NULL DEFAULT 0,
//     `taxonomy` varchar(32) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
//     `description` longtext COLLATE utf8mb4_unicode_520_ci NOT NULL,
//     `parent` bigint(20) unsigned NOT NULL DEFAULT 0,
//     `count` bigint(20) NOT NULL DEFAULT 0,
//     PRIMARY KEY (`term_taxonomy_id`),
//     UNIQUE KEY `term_id_taxonomy` (`term_id`,`taxonomy`),
//     KEY `taxonomy` (`taxonomy`)
// ) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

@Entity({ name: 'comments' })
export class Comment {
  @PrimaryColumn('uuid', {})
  comment_ID: string

  @Column()
  comment_post_ID: string
}
