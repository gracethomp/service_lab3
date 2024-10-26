import { Controller, Get, UseGuards } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { AuthGuard } from '../auth/auth-guard';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @UseGuards(AuthGuard)
  @Get()
  getAll() {
    return this.skillsService.findAll();
  }
}
