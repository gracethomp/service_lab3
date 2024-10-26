import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcryptjs';
import { User } from './entities';
import { CreateUserDto, UpdateUserDto } from './dto';
import { Region } from '../regions/entities';
import { Education } from '../education/entities';
import { Skill } from '../skills/entities';
import { Op } from 'sequelize';
import { Language } from '../languages/entities';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(Education) private educationRepository: typeof Education,
    @InjectModel(Region) private regionRepository: typeof Region,
    @InjectModel(Skill) private skillRepository: typeof Skill,
    @InjectModel(Language) private languageRepository: typeof Language,
  ) {}
  private readonly logger = new Logger(UsersService.name);

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const createdUser = await this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    this.logger.log(`User ${createdUser.id} created`);
    return createdUser;
  }

  async findAllMentors(
    page: number,
    limit?: number,
    searchTerm?: string,
  ): Promise<User[]> {
    const offset = limit ? (page - 1) * limit : undefined;

    const whereClause = {
      role: 'Mentor',
      ...(searchTerm && {
        [Op.or]: [
          { name: { [Op.iLike]: `%${searchTerm}%` } },
          { surname: { [Op.iLike]: `%${searchTerm}%` } },
          { jobTitle: { [Op.iLike]: `%${searchTerm}%` } },
          { currentCompany: { [Op.iLike]: `%${searchTerm}%` } },
          { description: { [Op.iLike]: `%${searchTerm}%` } },
        ],
      }),
    };

    const queryOptions: any = {
      where: whereClause,
      include: [Skill, Region, Education, Language],
    };

    if (limit) {
      queryOptions.limit = limit;
      queryOptions.offset = offset;
    }

    const mentors = await this.userRepository.findAll(queryOptions);

    return mentors;
  }

  async findByEmail(gmail: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email: gmail },
      include: [Skill, Region, Education, Language],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findByPk(id, {
      include: [Skill, Region, Education, Language],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findByPk(id);
    const { skills, languages, ...rest } = updateUserDto;
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (rest.email) {
      const userEmail = await this.userRepository.findOne({
        where: { email: updateUserDto.email },
      });
      if (userEmail) {
        throw new BadRequestException('Email is already exist');
      }
    }
    if (skills) {
      const skillsToUpdate = await this.skillRepository.findAll({
        where: { name: updateUserDto.skills },
      });
      if (skillsToUpdate.length !== skills.length) {
        throw new BadRequestException('One or more skills not found');
      }
      user.$set('skills', skillsToUpdate);
    }
    if (languages) {
      const languagesToUpdate = await this.languageRepository.findAll({
        where: { name: updateUserDto.languages },
      });
      if (languagesToUpdate.length !== languages.length) {
        throw new BadRequestException('One or more language not found');
      }
      user.$set('languages', languagesToUpdate);
    }
    if (rest.password) {
      const hashedPassword = await bcrypt.hash(rest.password, 10);
      await user.update({ ...rest, password: hashedPassword });
    } else {
      await user.update(rest);
    }

    return user;
  }

  async findMentorsInSameRegionAndLanguages(menteeId: number): Promise<User[]> {
    const mentee = await this.userRepository.findByPk(menteeId, {
      include: [Region, Language, Skill],
    });
    if (!mentee) {
      throw new NotFoundException('Mentee not found');
    }

    this.logger.debug(mentee.skills);

    const languageIds = mentee.languages?.map((lang) => lang.id);

    const mentors = await this.userRepository.findAll({
      where: {
        role: 'Mentor',
      },
      include: [
        Skill,
        Region,
        Education,
        {
          model: Language,
          where: { id: { [Op.in]: languageIds } },
        },
      ],
    });

    this.logger.debug(mentors.at(0)?.skills);

    return mentors;
  }
}
