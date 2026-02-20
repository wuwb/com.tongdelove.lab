// CREATE TABLE `wp_terms` (
//     `term_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
//     `name` varchar(200) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
//     `slug` varchar(200) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
//     `term_group` bigint(10) NOT NULL DEFAULT 0,
//     PRIMARY KEY (`term_id`),
//     KEY `slug` (`slug`(191)),
//     KEY `name` (`name`(191))
// ) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

export class Comment {
  comment_ID: string

  comment_post_ID: string
}
