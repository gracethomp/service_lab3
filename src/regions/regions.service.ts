import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Region } from './entities';

@Injectable()
export class RegionsService {
  constructor(@InjectModel(Region) private regionRepository: typeof Region) {}
  private readonly logger = new Logger(RegionsService.name);

  async findAll(): Promise<Region[]> {
    const regions = await this.regionRepository.findAll();
    return regions;
  }
}
