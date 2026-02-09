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

   @Column({ name: 'full_name', length: 100 })
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'password_hash', type: 'text' })
  passwordHash: string;

   @Column({
    type: 'enum',
    enum: UserRole,
  })
  role: UserRole;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // ===== RELATIONS =====

  @OneToMany(() => Post, post => post.author)
  posts: Post[];

   @OneToMany(() => Part, part => part.createdBy)
  parts: Part[];

  @OneToMany(() => Issue, issue => issue.createdBy)
  issues: Issue[];
}
