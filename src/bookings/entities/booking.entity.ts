import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { InferAttributes, InferCreationAttributes } from 'sequelize/types';
import { User } from '../../users/entities';

@Table
export class Booking extends Model<
  InferAttributes<Booking>,
  InferCreationAttributes<Booking>
> {
  @ForeignKey(() => User)
  @Column({ allowNull: false })
  menteeId: number;

  @ForeignKey(() => User)
  @Column({ allowNull: false })
  mentorId: number;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  public meetingTime: Date;

  @BelongsTo(() => User, 'menteeId')
  public mentee: User;

  @BelongsTo(() => User, 'mentorId')
  public mentor: User;
}
