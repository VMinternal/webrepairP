import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Device } from '../devices/device.entity';

@Entity('parts')
export class Part {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 200 })
  name: string;

  @Column({ length: 200, unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'integer', nullable: true })
  price: number;

  @ManyToOne(() => User, user => user.parts)
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  @ManyToMany(() => Device, device => device.parts)
  @JoinTable({
    name: 'part_devices',
    joinColumn: { name: 'part_id' },
    inverseJoinColumn: { name: 'device_id' },
  })
  devices: Device[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
