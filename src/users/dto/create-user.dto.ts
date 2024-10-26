import { Type } from 'class-transformer';
import {
  IsString,
  IsEmail,
  IsBoolean,
  IsNumber,
  IsOptional,
  Length,
  Min,
  IsInt,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @Length(0, 255)
  email: string;

  @IsString()
  @Length(8, 128)
  password: string;

  @IsString()
  @Length(0, 255)
  name: string;

  @IsString()
  @Length(0, 255)
  surname: string;

  @IsOptional()
  @IsString()
  @Length(0, 255)
  jobTitle: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Experience must be an integer value.' })
  @Min(0)
  experience: number;

  @IsOptional()
  @IsString()
  @Length(0, 255)
  currentCompany: string;

  @IsOptional()
  @IsString()
  @Length(0, 255)
  avatar?: string;

  @IsBoolean()
  isVerified: boolean;

  @IsString()
  @Length(0, 255)
  role: string;

  @IsOptional()
  @IsString()
  @Length(0, 500)
  description?: string;

  @IsOptional()
  @IsNumber()
  regionId: number;
}
