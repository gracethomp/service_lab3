import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth-guard';
import { RegionsService } from './regions.service';

@Controller('regions')
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}
  @UseGuards(AuthGuard)
  @Get()
  getAll() {
    return this.regionsService.findAll();
  }
}
