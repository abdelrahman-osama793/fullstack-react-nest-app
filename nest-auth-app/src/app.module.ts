import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { AuthController } from './auth/auth.controller';
import { AppConfigModule } from './infrastructure/app-config/app-config.module';
import { AppConfigService } from './infrastructure/app-config/app-config.service';
import { WinstonModule, utilities as nestWinstonModuleUtilities } from 'nest-winston';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { LoggerModule } from './common/logger/logger.module';
import * as winston from 'winston';
import { DatabaseModule } from './infrastructure/database/database.module';

@Module({
  imports: [
    AppConfigModule,
    WinstonModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (config: AppConfigService) => ({
        level: config.logLevel,
        transports: [
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.timestamp(),
              nestWinstonModuleUtilities.format.nestLike(),
            ),
          }),
          new winston.transports.File({
            filename: 'logs/combined.log',
            format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
          }),
          new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
            format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
          }),
        ],
      }),
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    LoggerModule,
  ],
  controllers: [UsersController, AuthController],
  providers: [AuthService],
})
export class AppModule { }
