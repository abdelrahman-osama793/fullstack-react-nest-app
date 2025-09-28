import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AppConfigService } from 'src/infrastructure/app-config/app-config.service';
import { AppConfigModule } from 'src/infrastructure/app-config/app-config.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    ConfigModule,
    AppConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule, AppConfigModule],
      inject: [AppConfigService],
      useFactory: async (configService: AppConfigService) => ({
        secret: configService.jwtSecret,
        signOptions: { expiresIn: configService.jwtExpiresIn || '3600s' },
      }),
    }),
    UsersModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
