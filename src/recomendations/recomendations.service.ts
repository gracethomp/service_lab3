import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { BookingsService } from 'src/bookings/bookings.service';
import { UsersService } from 'src/users/users.service';
import * as NodeCache from 'node-cache';

@Injectable()
export class RecommendationsService {
  private cache = new NodeCache({ stdTTL: 600 });
  private readonly logger = new Logger(RecommendationsService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly bookingsService: BookingsService,
  ) {}

  async getMentorRecommendations(menteeId: number) {
    const cacheKey = `recommendations_${menteeId}`;
    const cachedData = this.cache.get(cacheKey);

    if (cachedData) {
      this.logger.log('Returning cached recommendations');
      return cachedData;
    }

    try {
      const [mentors, preferences, users] = await Promise.all([
        this.usersService.findMentorsInSameRegionAndLanguages(menteeId),
        this.bookingsService.findAllMentorsByMenteeId(menteeId),
        this.bookingsService.findAllMenteesBookings(),
      ]);
      // this.logger.debug(mentors);

      const result = await axios.post(
        'http://ec2-16-171-6-178.eu-north-1.compute.amazonaws.com:9000/mentors/',
        {
          mentors,
          preferences,
          users,
          user_id: menteeId,
        },
      );

      this.cache.set(cacheKey, result.data);
      // this.logger.log(result.data);
      return result.data;
    } catch (err) {
      console.error('Error: ', err.response ? err.response.data : err.message);
      throw new Error('Failed to get recommendations');
    }
  }
}
