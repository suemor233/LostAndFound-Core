import { Entity, Column, ObjectIdColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert } from 'typeorm';
@Entity()
export class Lost {
  @ObjectIdColumn({ name: '_id' })
  id: string;

  @Column()
  uid: string;

  @Column()
  title: string;

  @Column()
  contact: string;

  @Column()
  category: string;

  @Column()
  lostTime: Date;

  @Column()
  detail: Date;

  
  @Column('boolean',{default:true})
  state = true

  @CreateDateColumn()
  created:Date

  @UpdateDateColumn()
  updated:Date

}
