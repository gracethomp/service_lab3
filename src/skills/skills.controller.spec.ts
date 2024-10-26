import { Test, TestingModule } from '@nestjs/testing';
import { SkillsController } from './skills.controller'; // Використовуйте відносний шлях
import { SkillsService } from './skills.service'; // Використовуйте відносний шлях
import { AuthGuard } from '../auth/auth-guard'; // Використовуйте відносний шлях

describe('SkillsController', () => {
  let controller: SkillsController;
  let service: SkillsService;

  const mockSkillsService = {
    findAll: jest.fn(() => [
      { id: 1, name: 'JavaScript' },
      { id: 2, name: 'TypeScript' },
    ]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SkillsController],
      providers: [
        {
          provide: SkillsService,
          useValue: mockSkillsService,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<SkillsController>(SkillsController);
    service = module.get<SkillsService>(SkillsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getAll should return an array of skills', async () => {
    const result = await controller.getAll();
    expect(result).toEqual([
      { id: 1, name: 'JavaScript' },
      { id: 2, name: 'TypeScript' },
    ]);
    expect(service.findAll).toHaveBeenCalledTimes(1);
  });
});
