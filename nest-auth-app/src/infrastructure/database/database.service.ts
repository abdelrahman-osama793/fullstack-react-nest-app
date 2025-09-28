import { Injectable, Inject, OnApplicationShutdown } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class DatabaseService implements OnApplicationShutdown {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
  ) {

    if (this.connection.readyState === 1) {
      this.logger.log('✅ MongoDB connected at startup', DatabaseService.name);
    } else {
      this.logger.warn(
        `⚠️ MongoDB not connected yet (state: ${this.connection.readyState})`,
        DatabaseService.name,
      );
    }

    this.connection.on('connected', () => {
      this.logger.log('✅ MongoDB connected', DatabaseService.name);
    });

    this.connection.on('error', (err) => {
      this.logger.error(`❌ MongoDB connection error: ${err}`, DatabaseService.name);
    });

    this.connection.on('disconnected', () => {
      this.logger.warn('⚠️ MongoDB disconnected', DatabaseService.name);
    });
  }

  async onApplicationShutdown(signal?: string) {
    this.logger.log(
      `🔌 App shutting down (${signal}) - closing MongoDB...`,
      DatabaseService.name,
    );
    await this.connection.close();
  }
}
