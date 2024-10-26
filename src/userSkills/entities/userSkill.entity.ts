import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { InferAttributes, InferCreationAttributes } from 'sequelize/types';
import { Skill } from '../../skills/entities'; // Використовуйте відносний шлях
import { User } from '../../users/entities'; // Використовуйте відносний шлях

@Table({
  timestamps: false,
})
export class UserSkill extends Model<
  InferAttributes<UserSkill>,
  InferCreationAttributes<UserSkill>
> {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Skill)
  @Column
  skillId!: number;
}
