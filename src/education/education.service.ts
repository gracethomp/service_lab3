import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Education } from './entities';
import { CreateEducationDto } from './dto/create-education.dto';
import { User } from 'src/users/entities';

@Injectable()
export class EducationService {
  constructor(
    @InjectModel(Education) private educationRepository: typeof Education,
  ) {}
  private readonly logger = new Logger(EducationService.name);

  async create(createEducationDto: CreateEducationDto, user: User) {
    // this.logger.log(user);
    const createdEducation = await this.educationRepository.create({
      ...createEducationDto,
      userId: user.id,
    });
    return createdEducation;
  }
}
