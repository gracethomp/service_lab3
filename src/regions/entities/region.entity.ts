import { Column, Model, Table, HasMany } from 'sequelize-typescript';
import { InferAttributes, InferCreationAttributes } from 'sequelize/types';
import { User } from '../../users/entities';

@Table({
  timestamps: false,
})
export class Region extends Model<
  InferAttributes<Region>,
  InferCreationAttributes<Region>
> {
  @Column({ allowNull: false })
  public name: string;
  @HasMany(() => User)
  users: User[];
}
