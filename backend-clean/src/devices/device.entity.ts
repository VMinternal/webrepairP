import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
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
  @JoinTable({
  name: 'device_parts',
  joinColumn: {
    name: 'device_id',
    referencedColumnName: 'id',
  },
  inverseJoinColumn: {
    name: 'part_id',
    referencedColumnName: 'id',
  },
})
parts: Part[];
}
