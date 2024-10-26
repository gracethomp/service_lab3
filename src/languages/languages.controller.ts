import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth-guard';
import { LanguagesService } from './languages.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('languages')
@Controller('languages')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Отримати всі мови' })
  @ApiResponse({
    status: 200,
    description: 'Список мов успішно отримано.',
  })
  async getAll() {
    return this.languagesService.findAll();
  }
}
