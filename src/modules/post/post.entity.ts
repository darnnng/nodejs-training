import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from 'shared/base/baseEntity';
import { User } from 'modules/user/user.entity';
import { Files } from 'modules/files/files.entity';

@Entity({ name: 'posts' })
export class Post extends BaseEntity {
  @Column({ nullable: false })
  title: string;

  @Column({ type: 'text', nullable: false })
  content: string;

  @ManyToOne(() => User, (user) => user.posts, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: User;

  @OneToMany(() => Files, (file) => file.post)
  files: File[];
}
