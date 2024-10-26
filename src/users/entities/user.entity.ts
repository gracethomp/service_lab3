import {
  Column,
  Model,
  Table,
  HasMany,
  ForeignKey,
  BelongsTo,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { InferAttributes, InferCreationAttributes } from 'sequelize/types';
import { Booking } from '../../bookings/entities';
import { Education } from '../../education/entities';
import { Language } from '../../languages/entities';
import { Region } from '../../regions/entities';
import { Skill } from '../../skills/entities';
import { UserLanguage } from '../../userLanguages/entities';
import { UserSkill } from '../../userSkills/entities';

@Table
export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  @Column({ allowNull: false, unique: true })
  public email: string;
  @Column({ allowNull: false })
  public password: string;
  @Column({ allowNull: false })
  public name: string;
  @Column({ allowNull: false })
  public surname: string;
  @Column
  public jobTitle?: string;
  @Column
  public experience?: number;
  @Column
  public currentCompany?: string;
  @Column
  public avatar?: string;
  @Column({ allowNull: false })
  public isVerified: boolean;
  @Column({ allowNull: false })
  public role: string;
  @Column({ type: DataType.STRING(500) })
  public description?: string;
  @ForeignKey(() => Region)
  @Column
  public regionId?: number;
  @BelongsTo(() => Region)
  public region?: Region;
  @HasMany(() => Education)
  public educations?: Education[];
  @HasMany(() => Booking)
  public bookings?: Booking[];
  @BelongsToMany(() => Skill, () => UserSkill)
  public skills?: Skill[];
  @BelongsToMany(() => Language, () => UserLanguage)
  public languages?: Language[];
}
