import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Skill } from './entities';
import { SkillsController } from './skills.controller';
import { SkillsService } from './skills.service';
import { UserSkill } from 'src/userSkills/entities';

@Module({
  imports: [SequelizeModule.forFeature([Skill, UserSkill])],
  exports: [SequelizeModule],
  controllers: [SkillsController],
  providers: [SkillsService],
})
export class SkillsModule {}
