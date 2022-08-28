import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { Lost } from '../lost/lost.entity';
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


  @Column(type => Lost)
  lost: Lost[];
}
