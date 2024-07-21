import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

// CREATE TABLE `wp_users` (
//     `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
//     `user_login` varchar(60) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
//     `user_pass` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
//     `user_nicename` varchar(50) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
//     `user_email` varchar(100) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
//     `user_url` varchar(100) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
//     `user_registered` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
//     `user_activation_key` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
//     `user_status` int(11) NOT NULL DEFAULT 0,
//     `display_name` varchar(250) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
//     PRIMARY KEY (`ID`),
//     KEY `user_login_key` (`user_login`),
//     KEY `user_nicename` (`user_nicename`),
//     KEY `user_email` (`user_email`)
// ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  ID: string

  @Column({
    name: 'user_login',
    type: 'varchar',
    length: 60,
    nullable: false,
    default: '',
  })
  userLogin: string

  @Column({
    name: 'user_pass',
    type: 'varchar',
    length: 255,
    nullable: false,
    default: '',
  })
  userPass: string

  @Column({
    name: 'user_nicename',
    type: 'varchar',
    length: 50,
    nullable: false,
    default: '',
  })
  userNicename: string

  @Column({
    name: 'user_email',
    type: 'varchar',
    length: 100,
    nullable: false,
    default: '',
  })
  userEmail: string

  @Column({
    name: 'user_url',
    type: 'varchar',
    length: 100,
    nullable: false,
    default: '',
  })
  userUrl: string

  @Column({
    name: 'user_registered',
    type: 'datetime',
    nullable: false,
    // asExpression: 'ADD COLUMN `user_registered` datetime NOT NULL DEFAULT `0000-00-00 00:00:00`',
  })
  userRegistered: Date

  @Column({
    name: 'user_activation_key',
    type: 'varchar',
    length: 255,
    nullable: false,
    default: '',
  })
  userActivationKey: string

  @Column({
    type: 'int',
    width: 11,
    name: 'user_status',
    nullable: false,
    default: 0,
  })
  userStatus: number

  @Column({
    name: 'display_name',
    type: 'varchar',
    length: 250,
    nullable: false,
    default: '',
  })
  displayName: string

  // custom columns

  @Column({ type: 'tinyint', nullable: false, default: 0 })
  spam: number

  @Column({ type: 'tinyint', nullable: false, default: 0 })
  deleted: number
}
