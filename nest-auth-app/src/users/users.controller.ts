import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(JwtGuard)
  @Get('profile')
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: 200, description: 'Get current user profile' })
  async getProfile(@Req() req) {
    return this.usersService.findById(req.user.userId);
  }
}
