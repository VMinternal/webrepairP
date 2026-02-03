import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Symptom } from '../symptoms/symptom.entity';

@Entity('vectors')
export class Vector {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Symptom, symptom => symptom.vectors, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'symptom_id' })
  symptom: Symptom;

  @Column({ type: 'float8', array: true, nullable: true })
  embedding: number[];
}
