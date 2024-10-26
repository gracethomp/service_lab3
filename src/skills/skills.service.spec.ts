import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { SkillsService } from './skills.service'; // Відносний шлях
import { Skill } from './entities'; // Відносний шлях
import { UserSkill } from '../userSkills/entities'; // Відносний шлях

describe('SkillsService', () => {
  let service: SkillsService;
  let skillModel: typeof Skill;

  const mockSkill = {
    findAll: jest.fn(() => [
      { id: 1, name: 'JavaScript' },
      { id: 2, name: 'TypeScript' },
    ]),
  };

  const mockUserSkill = {
    // Add mock methods if needed
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SkillsService,
        {
          provide: getModelToken(Skill),
          useValue: mockSkill,
        },
        {
          provide: getModelToken(UserSkill),
          useValue: mockUserSkill,
        },
      ],
    }).compile();

    service = module.get<SkillsService>(SkillsService);
    skillModel = module.get<typeof Skill>(getModelToken(Skill));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return an array of skills', async () => {
    const result = await service.findAll();
    expect(result).toEqual([
      { id: 1, name: 'JavaScript' },
      { id: 2, name: 'TypeScript' },
    ]);
    expect(skillModel.findAll).toHaveBeenCalledTimes(1);
  });
});
