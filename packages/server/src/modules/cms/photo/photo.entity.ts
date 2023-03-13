import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsOptional, IsDefined, IsString, IsNumber } from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity()
export class Photo {
    @IsOptional({ always: true })
    @PrimaryGeneratedColumn()
    id: string;

    @IsString({ always: true })
    @Column({ length: 500 })
    name: string;

    @Column('text')
    description: string;

    @Column()
    filename: string;

    @Column('int')
    views: number;

    @Column()
    isPublished: boolean;
}
