import { Entity, Column, ObjectIdColumn } from 'typeorm';
@Entity()
export class User {
  @ObjectIdColumn({ name: '_id' })
  id: string;

  @Column({unique: true})
  openid: string;

  @Column()
  nickName: string;

  @Column()
  avatarUrl: string;
}
