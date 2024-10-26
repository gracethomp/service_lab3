import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { UserLanguage } from './entities';
import { CreateUserLanguageDto } from './dto';
import { InjectModel } from '@nestjs/sequelize';
import { Language } from 'src/languages/entities';

@Injectable()
export class UserLanguagesService {
  constructor(
    @InjectModel(UserLanguage)
    private userLanguagesRepository: typeof UserLanguage,
    @InjectModel(Language) private languagesRepository: typeof Language,
  ) {}
  private readonly logger = new Logger(UserLanguagesService.name);

  async create(createUserLanguagesDto: CreateUserLanguageDto, userId: number) {
    const languages = await this.languagesRepository.findAll({
      where: { id: createUserLanguagesDto.languageIds },
    });

    if (languages.length !== createUserLanguagesDto.languageIds.length) {
      throw new BadRequestException('One or more skills not found');
    }
    const userLanguages = createUserLanguagesDto.languageIds.map(
      (languageId) => ({
        userId,
        languageId,
      }),
    );
    const result = await this.userLanguagesRepository.bulkCreate(userLanguages);
    return result;
  }
}
