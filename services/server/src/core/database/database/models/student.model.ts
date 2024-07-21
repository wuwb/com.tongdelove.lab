import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity({ name: 'students' })
export class Student {
  @PrimaryColumn()
  uuid: string

  @Column()
  name: string

  @Column()
  sex: number

  @Column({ name: 'create_time' })
  createTime: Date

  @Column({ name: 'update_time' })
  updateTime: Date
}
