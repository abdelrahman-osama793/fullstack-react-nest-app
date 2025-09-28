import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) { }

  get mongoUri(): string {
    return this.configService.get<string>('MONGODB_URI', 'mongodb://localhost:27017/default');
  }

  get jwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET', 'defaultSecret');
  }

  get jwtExpiresIn(): string {
    return this.configService.get<string>('JWT_EXPIRES_IN', '3600s');
  }

  get port(): number {
    return this.configService.get<number>('PORT', 3000);
  }

  get logLevel(): string {
    return this.configService.get<string>('LOG_LEVEL', 'info');
  }
}