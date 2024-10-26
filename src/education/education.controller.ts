import { Body, Controller, Logger, Post, Req, UseGuards } from '@nestjs/common';
import { Education } from './entities';
import { EducationService } from './education.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { AuthGuard } from 'src/auth/auth-guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('education')
@Controller('education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}
  private readonly logger = new Logger(EducationService.name);

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Створити освіту' })
  @ApiBody({ type: CreateEducationDto })
  @ApiResponse({
    status: 201,
    description: 'Освіта успішно створена.',
  })
  async create(
    @Req() request: any,
    @Body() createEducationDto: CreateEducationDto,
  ): Promise<Education> {
    return this.educationService.create(createEducationDto, request.user.user);
  }
}
