import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Education } from './entities/education.entity';
import { EducationService } from './education.service';
import { EducationController } from './education.controller';

@Module({
  imports: [SequelizeModule.forFeature([Education])],
  exports: [SequelizeModule],
  providers: [EducationService],
  controllers: [EducationController],
})
export class EducationModule {}
