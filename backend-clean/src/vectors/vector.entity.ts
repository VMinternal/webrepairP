import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Symptom } from '../symptoms/symptom.entity';

@Entity('vectors')
export class Vector {
  @PrimaryGeneratedColumn()
  id: number;

  // embedding double precision[]
  @Column('double precision', { array: true })
  embedding: number[];

  // Vector - Symptom (1-1)
  @OneToOne(() => Symptom, symptom => symptom.vector, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'symptoms_id' })
  symptom: Symptom;
}
