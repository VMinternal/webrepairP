import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from './device.entity';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device)
    private readonly deviceRepo: Repository<Device>,
  ) {}

  async findAll(): Promise<Device[]> {
    return this.deviceRepo.find();
  }

  async findOne(id: string): Promise<Device> {
    const device = await this.deviceRepo.findOne({ where: { id } });
    if (!device) {
      throw new NotFoundException('Device not found');
    }
    return device;
  }

  async create(data: Partial<Device>): Promise<Device> {
    const device = this.deviceRepo.create(data);
    return this.deviceRepo.save(device);
  }

  async update(id: string, data: Partial<Device>): Promise<Device> {
    const device = await this.findOne(id);
    Object.assign(device, data);
    return this.deviceRepo.save(device);
  }

  async remove(id: string): Promise<void> {
    const device = await this.findOne(id);
    await this.deviceRepo.remove(device);
  }
}
