import { Entity, Column, ObjectIdColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectId } from 'bson';
@Entity()
export class Lost {
  @ObjectIdColumn()
  id: ObjectId

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

  @Column()
  image: string[];

  @Column('boolean',{default:true})
  state = true

  @CreateDateColumn()
  created:Date

  @UpdateDateColumn()
  updated:Date

}
