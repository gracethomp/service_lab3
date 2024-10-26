import { IsString, IsNumber, Length } from 'class-validator';

export class CreateEducationDto {
  @IsString()
  @Length(0, 255)
  universityName: string;

  @IsString()
  @Length(0, 255)
  major: string;

  @IsNumber()
  startYear: number;

  @IsNumber()
  endYear: number;
}
