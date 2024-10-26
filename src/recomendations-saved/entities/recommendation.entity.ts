import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { InferAttributes, InferCreationAttributes } from 'sequelize/types';
import { User } from 'src/users/entities';

@Table
export class Recommendation extends Model<
  InferAttributes<Recommendation>,
  InferCreationAttributes<Recommendation>
> {
  @ForeignKey(() => User)
  @Column({ allowNull: false })
  menteeId: number;

  @ForeignKey(() => User)
  @Column({ allowNull: false })
  mentorId: number;

  @BelongsTo(() => User, 'menteeId')
  public mentee: User;

  @BelongsTo(() => User, 'mentorId')
  public mentor: User;
}
