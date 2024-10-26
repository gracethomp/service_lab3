import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth-guard';
import { UserLanguage } from './entities';
import { UserLanguagesService } from './userLanguage.service';
import { CreateUserLanguageDto } from './dto';

@Controller('userLanguage')
export class UserLanguagesController {
  constructor(private readonly userLanguageService: UserLanguagesService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Req() request: any,
    @Body() createUserLanguagesDto: CreateUserLanguageDto,
  ): Promise<UserLanguage[]> {
    return this.userLanguageService.create(
      createUserLanguagesDto,
      request.user.user.id,
    );
  }
}
