import { PrimaryGeneratedColumn, PrimaryColumn, Column, Entity, BeforeUpdate, ManyToOne, OneToMany, JoinColumn } from "typeorm";

@Entity()
export class Organization {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    login: string;

    @Column()
    node_id: string;

    @Column()
    url: string;

    @Column()
    repos_url: string;

    @Column()
    events_url: string;

    @Column()
    hooks_url: string;

    @Column()
    issues_url: string;

    @Column()
    members_url: string;

    @Column()
    public_members_url: string;

    @Column()
    avatar_url: string;

    @Column()
    description: string;

    @Column()
    name: string;

    @Column({
        default: '',
    })
    company: string;

    @Column()
    blog: string;

    @Column()
    location: string;

    @Column({
        default: '',
    })
    email: string;

    @Column({
        default: '',
    })
    twitter_username: string;

    @Column()
    is_verified: boolean;

    @Column()
    has_organization_projects: boolean;

    @Column()
    has_repository_projects: boolean;

    @Column()
    public_repos: number;

    @Column()
    public_gists: number;

    @Column()
    followers: number;

    @Column()
    following: number;

    @Column()
    html_url: string;

    @Column({ name: 'create_at' })
    createdAt: string;

    @Column({ name: 'update_at' })
    updatedAt: string;

    @Column()
    type: string;
}
