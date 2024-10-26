import { Column, Model, Table } from 'sequelize-typescript';
import { InferAttributes, InferCreationAttributes } from 'sequelize/types';

@Table({
  timestamps: false,
})
export class Language extends Model<
  InferAttributes<Language>,
  InferCreationAttributes<Language>
> {
  @Column({ allowNull: false, unique: true })
  public name: string;
}
