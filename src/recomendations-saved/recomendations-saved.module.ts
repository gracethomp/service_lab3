import { Module } from '@nestjs/common';
import { Recommendation } from './entities';
import { SequelizeModule } from '@nestjs/sequelize';
import { RecommendationsSavedService } from './recomendations-saved.service';
import { RecommendationsSavedController } from './recomendations-saved.controller';

@Module({
  imports: [SequelizeModule.forFeature([Recommendation])],
  providers: [RecommendationsSavedService],
  controllers: [RecommendationsSavedController],
})
export class RecommendationsSavedModule {}
