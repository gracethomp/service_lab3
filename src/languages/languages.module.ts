import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Language } from './entities';
import { LanguagesService } from './languages.service';
import { LanguagesController } from './languages.controller';

@Module({
  imports: [SequelizeModule.forFeature([Language])],
  providers: [LanguagesService],
  controllers: [LanguagesController],
})
export class LanguagesModule {}
