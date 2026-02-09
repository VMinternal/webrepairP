import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PostTag } from '../post/post-tag.entity';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => PostTag, postTag => postTag.tag)
  postTags: PostTag[];
}

