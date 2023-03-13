import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'address' })
export class Address {
    @PrimaryColumn()
    uuid: string;

    @Column()
    name: string;

    @Column()
    sex: number;

    @Column({ name: 'create_time' })
    createTime: Date;

    @Column({ name: 'update_time' })
    updateTime: Date;
}
