import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schemas/users.schema';
import { AppLogger } from 'src/common/logger/logger.service';

describe('UsersService', () => {
  let service: UsersService;

  const mockUserModel = { findById: jest.fn(), findOne: jest.fn() };
  const mockAppLogger = { log: jest.fn(), error: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getModelToken(User.name), useValue: mockUserModel },
        { provide: AppLogger, useValue: mockAppLogger },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
