import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Issue } from '../issues/issue.entity';
import { Vector } from '../vectors/vector.entity';

@Entity('symptoms')
export class Symptom {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Issue, issue => issue.symptoms, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'issue_id' })
  issue: Issue;

  @Column({ type: 'text' })
  content: string;

  @OneToMany(() => Vector, vector => vector.symptom)
  vectors: Vector[];
}
