import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'shared/base/baseEntity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  phone: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ select: false, nullable: false })
  password: string;

  @Column({ select: false, nullable: false })
  salt: string;

  @Column({ default: false, nullable: false })
  isAdmin: boolean;
}
