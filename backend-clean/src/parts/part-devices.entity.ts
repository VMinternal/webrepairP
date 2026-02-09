import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Part } from './part.entity';
import { Device } from '../devices/device.entity';

@Entity('part_devices')
export class PartDevice {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Part, part => part.partDevices, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'part_id' })
  part: Part;

  @ManyToOne(() => Device, device => device.partDevices, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'device_id' })
  device: Device;
}
