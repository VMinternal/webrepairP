import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { DeviceService } from './device.service';
import { Device } from './device.entity';

@Controller('devices')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Get()
  findAll(): Promise<Device[]> {
    return this.deviceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Device> {
    return this.deviceService.findOne(id);
  }

  @Post()
  create(@Body() body: Partial<Device>): Promise<Device> {
    return this.deviceService.create(body);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: Partial<Device>,
  ): Promise<Device> {
    return this.deviceService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.deviceService.remove(id);
  }
}
