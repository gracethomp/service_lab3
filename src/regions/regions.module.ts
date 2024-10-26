import { Module } from '@nestjs/common';
import { RegionsService } from './regions.service';
import { RegionsController } from './regions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Region } from './entities';

@Module({
  imports: [SequelizeModule.forFeature([Region])],
  providers: [RegionsService],
  controllers: [RegionsController],
})
export class RegionsModule {}
