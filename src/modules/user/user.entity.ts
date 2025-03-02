import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from 'shared/base/baseEntity';
import { Post } from 'modules/post/post.entity';
import { Subscription } from 'modules/subscription/subscription.entity';

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

  @Column({ default: false })
  isBlocked: boolean;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Subscription, (subscription) => subscription.follower)
  followers: Subscription[];

  @OneToMany(() => Subscription, (subscription) => subscription.following)
  following: Subscription[];
}
