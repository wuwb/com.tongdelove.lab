import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Autohotbox {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 500 })
    code: string;

    @Column()
    btcode: string;

    @Column()
    name: string;

    @Column()
    desc: string;

    @Column()
    specification: string;

    @Column('int')
    size: number;

    @Column()
    volume: number;

    @Column()
    weight: number;

    @Column()
    boxWeight: number;
}
