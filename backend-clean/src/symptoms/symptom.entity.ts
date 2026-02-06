import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from 'typeorm';
import { Issue } from '../issues/issue.entity';
import { Vector } from '../vectors/vector.entity'

@Entity('symptoms')
export class Symptom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => Issue, issue => issue.symptoms, {
    onDelete: 'CASCADE',
  })
  issue: Issue;

    // Symptom - Vector (1-1)
  @OneToOne(() => Vector, vector => vector.symptom)
  vector: Vector;
}

