import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';

import { User} from '../users/user.entity';
import {PartDevice } from './part-devices.entity';

@Entity('part')
export class Part {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 200})
    name: string;

    @Column({ length: 200, unique: true })
  slug: string;

     @Column({ nullable: true })
  description: string;

    @Column({ type: 'int'})
    price: number

      @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

    // ===== RELATIONS =====
    @ManyToOne(() => User, user => user.parts)
    @JoinColumn({ name: 'created_by' })
    createdBy: User;

    @OneToMany(() => PartDevice, partDevice => partDevice.part)
    partDevices: PartDevice[];
}