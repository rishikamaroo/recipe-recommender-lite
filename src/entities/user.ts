import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class UserAccount {
  @Column({
    unique: true,
  })
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  createdAt: Date;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    unique: true,
  })
  username: string;

  @Column({
    unique: true,
  })
  phoneNumber: number;

  @Column({
    select: false,
  })
  password: string;
}
