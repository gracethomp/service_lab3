import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Recommendation } from './entities';
import { User } from 'src/users/entities';

@Injectable()
export class RecommendationsSavedService {
  constructor(
    @InjectModel(Recommendation)
    private recommendationRepository: typeof Recommendation,
  ) {}
  async findAll(id: number) {
    const recommendations = await this.recommendationRepository.findAll({
      where: { menteeId: id },
      include: [{ model: User, as: 'mentor' }],
    });
    return recommendations;
  }
}
