import { Entity, Column, ObjectIdColumn } from 'typeorm';
@Entity()
export class User {
  @ObjectIdColumn({ name: '_id' })
  id: string;

  @Column({unique: true})
  username: string;

  @Column({select:false})
  password: string;

  @Column({select:false})
  authCode: string;

  @Column()
  mail: string;


}
