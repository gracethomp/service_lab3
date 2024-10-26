import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserLanguage } from './entities';

import { UserLanguagesService } from './userLanguage.service';
import { LanguagesModule } from 'src/languages/languages.module';
import { Language } from 'src/languages/entities';
import { UsersModule } from 'src/users/users.module';
import { UserLanguagesController } from './userLanguages.controller';

@Module({
  imports: [
    SequelizeModule.forFeature([UserLanguage, Language]),
    LanguagesModule,
    UsersModule,
  ],
  controllers: [UserLanguagesController],
  providers: [UserLanguagesService],
  exports: [UserLanguagesService],
})
export class UserLanguagesModule {}
