import { Column, Model, Table, BelongsToMany } from 'sequelize-typescript';
import { InferAttributes, InferCreationAttributes } from 'sequelize/types';
import { UserSkill } from '../../userSkills/entities';
import { User } from '../../users/entities';

@Table({
  timestamps: false,
})
export class Skill extends Model<
  InferAttributes<Skill>,
  InferCreationAttributes<Skill>
> {
  @Column({ allowNull: false, unique: true })
  public name: string;
  @BelongsToMany(() => User, () => UserSkill)
  public users: User[];
}
