import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { PartDevice } from '../parts/part-devices.entity';

@Entity('devices')
export class Device {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  brand: string;

  @Column({ length: 100 })
  model: string;

  // Relation with part_devices
  @OneToMany(() => PartDevice, partDevice => partDevice.device)
  partDevices: PartDevice[];
}
