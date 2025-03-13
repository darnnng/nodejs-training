import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from 'shared/base/baseEntity';
import { Post } from 'modules/post/post.entity';

@Entity({ name: 'files' })
export class Files extends BaseEntity {
  @Column({ nullable: false })
  url: string;

  @Column({ nullable: false })
  type: string;

  @ManyToOne(() => Post, (post) => post.files, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  post: Post;
}
