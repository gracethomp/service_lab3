import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth-guard';
import { RecommendationsService } from './recomendations.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('recommendations')
@Controller('recommendations')
export class RecommendationsController {
  constructor(
    private readonly recommendationsService: RecommendationsService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('mentors')
  @ApiOperation({ summary: 'Отримати рекомендації менторів' })
  @ApiResponse({
    status: 200,
    description: 'Рекомендації менторів успішно отримано.',
  })
  @ApiResponse({
    status: 403,
    description: 'Доступ заборонений.',
  })
  async getMentorRecommendations(@Req() request: any) {
    return this.recommendationsService.getMentorRecommendations(
      request.user.user.id,
    );
  }
}
