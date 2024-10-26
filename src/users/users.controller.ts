import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './entities';
import { AuthGuard } from '../auth/auth-guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('mentors')
  getAllMentors(
    @Query('page') page: number = 1,
    @Query('limit') limit: number,
    @Query('search') search: string = '',
  ) {
    return this.usersService.findAllMentors(page, limit, search);
  }

  @UseGuards(AuthGuard)
  @Get('mentors/acceptable')
  getAllGoodMentors(@Req() request: any) {
    return this.usersService.findMentorsInSameRegionAndLanguages(
      request.user.user.id,
    );
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() request: any) {
    return this.usersService.findById(request.user.user.id);
  }

  @UseGuards(AuthGuard)
  @Get('mentors/:id')
  async getMentor(@Req() request: any, @Param('id') id: string) {
    const user = await this.usersService.findById(id);
    if (user.role !== 'Mentor') {
      throw new ForbiddenException('Access denied');
    }
    return user;
  }

  @UseGuards(AuthGuard)
  @Patch('profile')
  async updateUser(@Req() request: any, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(request.user.user.id, updateUserDto);
  }
}
