import { Entity, PrimaryColumn, Column } from 'typeorm'

// CREATE TABLE `wp_posts` (
//     `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
//     `post_author` bigint(20) unsigned NOT NULL DEFAULT 0,
//     `post_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
//     `post_date_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
//     `post_content` longtext COLLATE utf8mb4_unicode_520_ci NOT NULL,
//     `post_title` text COLLATE utf8mb4_unicode_520_ci NOT NULL,
//     `post_excerpt` text COLLATE utf8mb4_unicode_520_ci NOT NULL,
//     `post_status` varchar(20) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT 'publish',
//     `comment_status` varchar(20) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT 'open',
//     `ping_status` varchar(20) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT 'open',
//     `post_password` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
//     `post_name` varchar(200) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
//     `to_ping` text COLLATE utf8mb4_unicode_520_ci NOT NULL,
//     `pinged` text COLLATE utf8mb4_unicode_520_ci NOT NULL,
//     `post_modified` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
//     `post_modified_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
//     `post_content_filtered` longtext COLLATE utf8mb4_unicode_520_ci NOT NULL,
//     `post_parent` bigint(20) unsigned NOT NULL DEFAULT 0,
//     `guid` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
//     `menu_order` int(11) NOT NULL DEFAULT 0,
//     `post_type` varchar(20) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT 'post',
//     `post_mime_type` varchar(100) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
//     `comment_count` bigint(20) NOT NULL DEFAULT 0,
//     PRIMARY KEY (`ID`),
//     KEY `post_name` (`post_name`(191)),
//     KEY `type_status_date` (`post_type`,`post_status`,`post_date`,`ID`),
//     KEY `post_parent` (`post_parent`),
//     KEY `post_author` (`post_author`)
// ) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

@Entity({ name: 'post' })
export class Post {
  @PrimaryColumn('uuid', {})
  ID: string

  @Column({ type: 'bigint' })
  post_author: number

  @Column()
  post_date: Date

  @Column()
  post_date_gmt: Date

  @Column()
  post_content: string

  @Column()
  post_title: string

  @Column()
  post_excerpt: string

  @Column()
  post_status: string

  @Column()
  comment_status: string

  @Column()
  ping_status: string

  @Column()
  post_password: string

  @Column()
  post_name: string

  @Column()
  to_ping: string

  @Column()
  pinged: string

  @Column()
  post_modified: Date

  @Column()
  post_modified_gmt: Date

  @Column()
  post_content_filtered: number

  @Column()
  post_parent: number

  @Column()
  guid: string

  @Column({ type: 'int' })
  menu_order: number

  @Column()
  post_type: string

  @Column()
  post_mime_type: string

  @Column({ type: 'bigint' })
  comment_count: number
}
