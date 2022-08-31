import { ObjectId } from 'bson';
import { Entity, Column, ObjectIdColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
@Entity()
export class Found {
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
  foundTime: Date;

  @Column()
  detail: Date;

  @Column()
  image: string[];

  @Column({default:true})
  state:boolean

  @CreateDateColumn()
  created:Date

  @UpdateDateColumn()
  updated:Date

}
