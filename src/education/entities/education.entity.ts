import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { InferAttributes, InferCreationAttributes } from 'sequelize/types';
import { User } from '../../users/entities';

@Table
export class Education extends Model<
  InferAttributes<Education>,
  InferCreationAttributes<Education>
> {
  @Column({ allowNull: false })
  public universityName: string;
  @Column({ allowNull: false })
  public major: string;
  @Column({ allowNull: false })
  public startYear: number;
  @Column({ allowNull: false })
  public endYear: number;
  @ForeignKey(() => User)
  @Column({ allowNull: false })
  userId: number;
}
