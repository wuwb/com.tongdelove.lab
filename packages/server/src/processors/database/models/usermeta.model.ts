import { Entity, PrimaryColumn, Column } from 'typeorm';

// CREATE TABLE `wp_usermeta` (
//     `umeta_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
//     `user_id` bigint(20) unsigned NOT NULL DEFAULT 0,
//     `meta_key` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
//     `meta_value` longtext COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
//     PRIMARY KEY (`umeta_id`),
//     KEY `user_id` (`user_id`),
//     KEY `meta_key` (`meta_key`(191))
// ) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

@Entity({ name: 'usermeta' })
export class Usermeta {
    @PrimaryColumn({ type: 'bigint' })
    umeta_id: string;

    @Column()
    comment_post_ID: string;
}
