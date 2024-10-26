import { ArrayNotEmpty, IsArray, IsInt } from 'class-validator';

export class CreateUserLanguageDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  languageIds: number[];
}
