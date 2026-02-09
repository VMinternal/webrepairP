import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Post } from './post.entity';
import { Tag } from '../tags/tag.entity';

@Entity('post_tags')
export class PostTag {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Post, post => post.postTags, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @ManyToOne(() => Tag, tag => tag.postTags, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tag_id' })
  tag: Tag;
}
