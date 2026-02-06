import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Symptom } from '../symptoms/symptom.entity';

@Entity('issues')
export class Issue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  causes: string;

  @Column({ nullable: true })
  solutions: string;

  @Column({ length: 200, unique: true })
  slug: string;

  @OneToMany(() => Symptom, symptom => symptom.issue)
  symptoms: Symptom[];

  @ManyToOne(() => User, user => user.issues)
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
