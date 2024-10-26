import { IsNumber, IsNotEmpty, IsDateString } from 'class-validator';
export class CreateBookingDto {
  @IsNotEmpty()
  @IsNumber()
  mentorId: number;

  @IsNotEmpty()
  @IsDateString()
  meetingTime: Date;
}
