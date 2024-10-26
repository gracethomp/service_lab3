import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserSkill } from '../userSkills/entities';
import { Skill } from './entities';

@Injectable()
export class SkillsService {
  constructor(
    @InjectModel(UserSkill)
    private userSkillRepository: typeof UserSkill,
    @InjectModel(Skill) private skillRepository: typeof Skill,
  ) {}
  private readonly logger = new Logger(SkillsService.name);

  async findAll(): Promise<Skill[]> {
    const skills = await this.skillRepository.findAll();
    return skills;
  }
}
