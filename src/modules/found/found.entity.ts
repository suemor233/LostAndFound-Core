import { Entity, Column, ObjectIdColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
@Entity()
export class Found {
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
  foundTime: Date;

  @Column()
  detail: Date;

  @CreateDateColumn()
  created:Date

  @UpdateDateColumn()
  updated:Date

}