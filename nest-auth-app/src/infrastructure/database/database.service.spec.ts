import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from './database.service';
import { AppLogger } from '../../common/logger/logger.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

describe('DatabaseService', () => {
  let service: DatabaseService;

  const mockConnection = {
    on: jest.fn(),
  };

  const mockAppLogger = {
    log: jest.fn(),
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
    verbose: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DatabaseService,
        { provide: 'DatabaseConnection', useValue: mockConnection },
        { provide: AppLogger, useClass: AppLogger },
        { provide: WINSTON_MODULE_NEST_PROVIDER, useValue: mockAppLogger },
      ],
    }).compile();

    service = module.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
