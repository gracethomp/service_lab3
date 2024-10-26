import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth-guard';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('bookings')
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Створити бронювання' })
  @ApiBody({ type: CreateBookingDto })
  @ApiResponse({
    status: 201,
    description: 'Бронювання успішно створене.',
  })
  async create(
    @Body() createBookingDto: CreateBookingDto,
    @Req() request: any,
  ) {
    return this.bookingsService.create(createBookingDto, request.user.user);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Отримати всі бронювання для ментора' })
  @ApiResponse({
    status: 200,
    description: 'Успішно отримані всі бронювання.',
  })
  getAllMentors(@Req() request: any) {
    return this.bookingsService.findAllByMenteeId(request.user.user.id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Скасувати бронювання' })
  @ApiResponse({
    status: 200,
    description: 'Бронювання успішно скасоване.',
  })
  @ApiResponse({
    status: 404,
    description: 'Бронювання не знайдене.',
  })
  cancelBooking(@Req() request: any, @Param('id') id: number) {
    return this.bookingsService.deleteById(id, request.user.user.id);
  }

  @UseGuards(AuthGuard)
  @Get('/mentors')
  @ApiOperation({ summary: 'Отримати всіх менторів для менти' })
  @ApiResponse({
    status: 200,
    description: 'Успішно отримані всі ментори.',
  })
  async getMentorsByMenteeId(@Req() request: any) {
    return this.bookingsService.findAllMentorsByMenteeId(request.user.user.id);
  }

  @UseGuards(AuthGuard)
  @Get('/mentees')
  @ApiOperation({ summary: 'Отримати всі бронювання менти' })
  @ApiResponse({
    status: 200,
    description: 'Успішно отримані всі бронювання менти.',
  })
  async getAllMentees() {
    return this.bookingsService.findAllMenteesBookings();
  }
}
