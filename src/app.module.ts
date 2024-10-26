import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeDevelopmentConfig } from './config';
import { EducationModule } from './education/education.module';
import { SkillsModule } from './skills/skills.module';
import { RegionsModule } from './regions/regions.module';
import { LanguagesModule } from './languages/languages.module';
import { BookingModule } from './bookings/booking.module';
import { JwtModule } from '@nestjs/jwt';
import { UserLanguagesModule } from './userLanguages/userLanguages.module';
import { RecommendationsModule } from './recomendations/recomendations.module';
import { UploadController } from './upload/upload.controller';
import { FileUploadService } from './upload/upload.service';
import { RecommendationsSavedModule } from './recomendations-saved/recomendations-saved.module';

@Module({
  imports: [
    SequelizeModule.forRoot(sequelizeDevelopmentConfig),
    AuthModule,
    UsersModule,
    EducationModule,
    SkillsModule,
    RegionsModule,
    LanguagesModule,
    BookingModule,
    UserLanguagesModule,
    JwtModule.register({
      global: true,
      secret:
        'd4a18a3f1e67dfa72edc2ce1cae7ed09b44a9c5796ffc1c1a806feabcb69003f97bd8a874f8f5bb43447dfebab814130ae470251257e6d973a28de232af189bd',
      signOptions: { expiresIn: '1d' },
    }),
    RecommendationsModule,
    RecommendationsSavedModule,
  ],
  controllers: [AppController, UploadController],
  providers: [AppService, FileUploadService],
})
export class AppModule {}
