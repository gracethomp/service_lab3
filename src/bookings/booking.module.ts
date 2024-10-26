import { Module } from '@nestjs/common';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { Booking } from './entities';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/entities';

@Module({
  imports: [SequelizeModule.forFeature([Booking, User])],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingModule {}
