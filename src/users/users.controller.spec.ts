/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth-guard';
import { CreateUserDto, UpdateUserDto } from './dto';
import { ForbiddenException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUsersService = {
    create: jest.fn((dto: CreateUserDto) => {
      return {
        id: Date.now(),
        ...dto,
      };
    }),
    findAllMentors: jest.fn(
      (_page: number, _limit: number, _search: string) => {
        return [
          { id: 1, name: 'Mentor 1', role: 'Mentor' },
          { id: 2, name: 'Mentor 2', role: 'Mentor' },
        ];
      },
    ),
    findById: jest.fn((id: string) => {
      if (id === '1') {
        return { id: 1, name: 'Mentor 1', role: 'Mentor' };
      }
      return { id: id, name: 'User', role: 'User' };
    }),
    updateUser: jest.fn((id: number, dto: UpdateUserDto) => {
      return { id, ...dto };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const dto: CreateUserDto = {
      name: 'Test User',
      email: 'test@example.com',
      password: '',
      surname: '',
      jobTitle: '',
      experience: 0,
      currentCompany: '',
      isVerified: false,
      role: '',
      regionId: 0,
    };
    const result = await controller.create(dto);
    expect(result).toEqual({
      id: expect.any(Number),
      ...dto,
    });
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should return all mentors', async () => {
    const result = await controller.getAllMentors(1, 10, '');
    expect(result).toEqual([
      { id: 1, name: 'Mentor 1', role: 'Mentor' },
      { id: 2, name: 'Mentor 2', role: 'Mentor' },
    ]);
    expect(service.findAllMentors).toHaveBeenCalledWith(1, 10, '');
  });

  it('should return user profile', async () => {
    const request = { user: { user: { id: '1' } } };
    const result = await controller.getProfile(request);
    expect(result).toEqual({ id: 1, name: 'Mentor 1', role: 'Mentor' });
    expect(service.findById).toHaveBeenCalledWith('1');
  });

  it('should return mentor by id', async () => {
    const request = { user: { user: { id: '1' } } };
    const result = await controller.getMentor(request, '1');
    expect(result).toEqual({ id: 1, name: 'Mentor 1', role: 'Mentor' });
    expect(service.findById).toHaveBeenCalledWith('1');
  });

  it('should throw ForbiddenException if user is not a mentor', async () => {
    const request = { user: { user: { id: '1' } } };
    try {
      await controller.getMentor(request, '2');
    } catch (e) {
      expect(e).toBeInstanceOf(ForbiddenException);
    }
  });

  it('should update user profile', async () => {
    const request = { user: { user: { id: '1' } } };
    const dto: UpdateUserDto = { name: 'Updated User' };
    const result = await controller.updateUser(request, dto);
    expect(result).toEqual({ id: '1', ...dto });
    expect(service.updateUser).toHaveBeenCalledWith('1', dto);
  });
});
