import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Language } from './entities';

@Injectable()
export class LanguagesService {
  constructor(
    @InjectModel(Language) private languageRepository: typeof Language,
  ) {}
  private readonly logger = new Logger(LanguagesService.name);

  async findAll(): Promise<Language[]> {
    const languages = await this.languageRepository.findAll();
    return languages;
  }
}
