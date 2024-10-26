import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { InferAttributes, InferCreationAttributes } from 'sequelize/types';
import { Language } from '../../languages/entities';
import { User } from '../../users/entities';

@Table({
  timestamps: false,
})
export class UserLanguage extends Model<
  InferAttributes<UserLanguage>,
  InferCreationAttributes<UserLanguage>
> {
  @ForeignKey(() => User)
  @Column({ allowNull: false })
  public userId: number;
  @BelongsTo(() => User)
  public user?: User;
  @ForeignKey(() => Language)
  @Column({ allowNull: false })
  public languageId: number;
  @BelongsTo(() => Language)
  public language?: Language;
}
