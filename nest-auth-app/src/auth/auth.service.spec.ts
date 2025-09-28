import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AppLogger } from 'src/common/logger/logger.service';

describe('AuthService', () => {
  let service: AuthService;

  const mockUsersService = { findByEmail: jest.fn(), create: jest.fn() };
  const mockJwtService = { signAsync: jest.fn() };
  const mockAppLogger = { log: jest.fn(), error: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: AppLogger, useValue: mockAppLogger },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
