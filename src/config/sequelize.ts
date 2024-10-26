import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { Education } from 'src/education/entities';
import { Language } from 'src/languages/entities';
import { Booking } from 'src/bookings/entities';
import { Region } from 'src/regions/entities';
import { Skill } from 'src/skills/entities';
import { UserLanguage } from 'src/userLanguages/entities';
import { UserSkill } from 'src/userSkills/entities';
import { User } from 'src/users/entities';
import { Recommendation } from 'src/recomendations-saved/entities';

export const sequelizeDevelopmentConfig: SequelizeModuleOptions = {
  username: 'my_app_role',
  password: 'some_password',
  database: 'db',
  port: 5432,
  host: 'db',
  dialect: 'postgres',
  autoLoadModels: true,
  models: [
    User,
    Education,
    Skill,
    Region,
    Language,
    UserSkill,
    UserLanguage,
    Booking,
    Recommendation,
  ],
  sync: { force: false },
};
