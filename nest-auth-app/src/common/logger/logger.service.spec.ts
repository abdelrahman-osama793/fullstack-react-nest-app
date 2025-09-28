import { Test, TestingModule } from '@nestjs/testing';
import { AppLogger } from './logger.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

describe('AppLogger', () => {
  let service: AppLogger;

  const mockWinstonLogger = {
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
        AppLogger,
        { provide: WINSTON_MODULE_NEST_PROVIDER, useValue: mockWinstonLogger },
      ],
    }).compile();

    service = module.get<AppLogger>(AppLogger);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
