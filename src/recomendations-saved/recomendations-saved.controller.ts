import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth-guard';
import { RecommendationsSavedService } from './recomendations-saved.service';

@Controller('recommendations/saved')
export class RecommendationsSavedController {
  constructor(
    private readonly recommendationService: RecommendationsSavedService,
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  getAll(@Req() request: any) {
    return this.recommendationService.findAll(request.user.user.id);
  }
}
