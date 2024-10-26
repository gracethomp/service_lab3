import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Region } from '../regions/entities/region.entity';
import { EducationModule } from '../education/education.module';
import { SkillsModule } from 'src/skills/skills.module';
import { LanguagesModule } from 'src/languages/languages.module';
import { Language } from 'src/languages/entities';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Region, Language]),
    EducationModule,
    SkillsModule,
    LanguagesModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
