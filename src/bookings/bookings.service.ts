import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Booking } from './entities';
import { User } from 'src/users/entities';
import { CreateBookingDto } from './dto';
import { Region } from 'src/regions/entities';
import { Language } from 'src/languages/entities';
import { Skill } from 'src/skills/entities';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking) private bookingsRepository: typeof Booking,
    @InjectModel(User) private userRepository: typeof User,
  ) {}
  private readonly logger = new Logger(BookingsService.name);

  async create(createBookingsDto: CreateBookingDto, mentee: User) {
    const mentor = await this.userRepository.findByPk(
      createBookingsDto.mentorId,
    );
    if (!mentor) {
      throw new BadRequestException();
    }
    this.logger.log(mentor);
    const createdBooking = await this.bookingsRepository.create({
      ...createBookingsDto,
      menteeId: mentee.id,
      mentee: mentee,
      mentor: mentor,
    });

    this.logger.log(`Booking ${createdBooking.id} created`);
    return { ...createdBooking.dataValues, mentor: mentor };
  }

  async findAllMenteesBookings() {
    const mentees = await this.userRepository.findAll({
      where: { role: 'Mentee' },
      include: [
        {
          model: Booking,
          required: true,
          include: [
            {
              model: User,
              as: 'mentor',
              include: [Region, Skill, Language],
            },
          ],
        },
      ],
    });
    const result = mentees.map((mentee) => {
      const mentors = mentee.bookings?.map((booking) => booking.mentor);
      return {
        ...mentee.get({ plain: true }),
        mentors,
      };
    });

    return result;
  }

  async findAllByMenteeId(id: number): Promise<Booking[]> {
    const bookings = await this.bookingsRepository.findAll({
      where: { menteeId: id },
      include: [
        { model: User, as: 'mentee' },
        { model: User, as: 'mentor' },
      ],
    });
    return bookings;
  }

  async deleteById(bookingId: number, userId: number) {
    const booking = await this.bookingsRepository.findByPk(bookingId);
    if (booking?.menteeId !== userId) {
      throw new ForbiddenException();
    }
    if (!booking) {
      throw new NotFoundException(`Booking with id ${bookingId} not found`);
    }
    await this.bookingsRepository.destroy({
      where: { id: bookingId },
    });
    this.logger.log(`Deleted booking with id ${bookingId}`);
  }

  async findAllMentorsByMenteeId(menteeId: number): Promise<User[]> {
    const bookings = await this.bookingsRepository.findAll({
      where: { menteeId: menteeId },
      include: [
        { model: User, as: 'mentor', include: [Region, Language, Skill] },
      ],
    });

    const mentors = bookings.map((booking) => booking.mentor);
    const uniqueMentors = Array.from(
      new Set(mentors.map((mentor) => mentor?.id)),
    )
      .map((id) => mentors.find((mentor) => mentor?.id === id))
      .filter((mentor): mentor is User => mentor !== undefined);

    return uniqueMentors;
  }
}
