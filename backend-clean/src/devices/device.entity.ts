import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Part } from '../parts/part.entity';

@Entity('devices')
export class Device {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  brand: string;

  @Column({ length: 100 })
  model: string;

  @ManyToMany(() => Part, part => part.devices)
  parts: Part[];
}
