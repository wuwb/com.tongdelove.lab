import { Entity, PrimaryColumn, Column } from 'typeorm';

// CREATE TABLE `wp_term_relationships` (
//     `object_id` bigint(20) unsigned NOT NULL DEFAULT 0,
//     `term_taxonomy_id` bigint(20) unsigned NOT NULL DEFAULT 0,
//     `term_order` int(11) NOT NULL DEFAULT 0,
//     PRIMARY KEY (`object_id`,`term_taxonomy_id`),
//     KEY `term_taxonomy_id` (`term_taxonomy_id`)
// ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

@Entity({ name: 'comments' })
export class Comment {
    @PrimaryColumn('uuid', {})
    comment_ID: string;

    @Column()
    comment_post_ID: string;
}
