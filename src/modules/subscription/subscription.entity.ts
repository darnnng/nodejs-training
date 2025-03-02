import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from 'shared/base/baseEntity';
import { User } from 'modules/user/user.entity';

@Entity({ name: 'subscription' })
export class Subscription extends BaseEntity {
  @ManyToOne(() => User, (user) => user.followers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'follower_user_id' })
  follower: User;

  @ManyToOne(() => User, (user) => user.following, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'following_user_id' })
  following: User;
}
