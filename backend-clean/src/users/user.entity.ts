import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Post } from '../post/post.entity';
import { Part } from '../parts/part.entity';
import { Issue } from '../issues/issue.entity';
import { UserRole } from '../common/enums/user-role.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

   @Column({
      type: 'enum',
      enum: UserRole,
      default: UserRole.ADMIN,
    })
    status: UserRole;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // ===== RELATIONS =====

  @OneToMany(() => Post, post => post.createdBy)
  posts: Post[];

   @OneToMany(() => Part, part => part.createdBy)
  parts: Part[];

  @OneToMany(() => Issue, issue => issue.createdBy)
  issues: Issue[];
}
