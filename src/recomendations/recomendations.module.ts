import { Module } from '@nestjs/common';
import { RecommendationsService } from './recomendations.service';
import { RecommendationsController } from './recomendations.controller';
import { BookingsService } from 'src/bookings/bookings.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/entities';
import { UsersService } from 'src/users/users.service';
import { Booking } from 'src/bookings/entities';
import { Education } from 'src/education/entities';
import { Skill } from 'src/skills/entities';
import { Region } from 'src/regions/entities';
import { Language } from 'src/languages/entities';
import { RecommendationsSavedService } from 'src/recomendations-saved/recomendations-saved.service';
import { Recommendation } from 'src/recomendations-saved/entities';

@Module({
  imports: [
    SequelizeModule.forFeature([
      User,
      Booking,
      Education,
      Skill,
      Region,
      Language,
      Recommendation,
    ]),
  ],
  providers: [
    RecommendationsService,
    BookingsService,
    UsersService,
    RecommendationsSavedService,
  ],
  controllers: [RecommendationsController],
})
export class RecommendationsModule {}
