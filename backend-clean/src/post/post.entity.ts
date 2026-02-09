import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../users/user.entity';
import { PostStatus } from '../common/enums/post-status.enum';
import { PostTag } from './post-tag.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 200 })
  title: string;

  @Column({ length: 200, unique: true })
  slug: string;

  @Column('text')
  content: string;

  @Column({
    type: 'enum',
    enum: PostStatus,
    default: PostStatus.DRAFT,
  })
  status: PostStatus;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  // ===== RELATIONS =====
   @ManyToOne(() => User, user => user.posts, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'author_id' })
  author: User;

    @OneToMany(() => PostTag, postTag => postTag.post)
postTags: PostTag[];

}
