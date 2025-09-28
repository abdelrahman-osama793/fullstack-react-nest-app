import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { UsersService } from 'src/users/users.service';
import { AppLogger } from 'src/common/logger/logger.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly logger: AppLogger,
  ) { }

  async signUp(signUpDto: SignUpDto): Promise<{ message: string, token: string } | undefined> {
    try {
      this.logger.log("signUp Service Started", AuthService.name);

      const { email, password, firstName, lastName } = signUpDto;

      const existingUser = await this.usersService.findByEmail(email);
      if (existingUser) {
        throw new ConflictException('Email already exists');
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await this.usersService.create({
        email,
        password: hashedPassword,
        firstName,
        lastName,
      });

      return { message: 'User signed up successfully', token: this.signToken(user._id.toString(), user.email) };

    } catch (error) {      
      this.logger.error("Error during sign up", error.stack, AuthService.name);
      throw new InternalServerErrorException(error.message || 'Error happened while signing up');
    }
  }

  async signIn(signInDto: SignInDto): Promise<{ message: string, token: string }> {
    try {
      this.logger.log("signIn Service Started", AuthService.name);

      const { email, password } = signInDto;

      const user = await this.usersService.findByEmail(email);

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        throw new UnauthorizedException('Invalid credentials');
      }

      return { message: 'User signed in successfully', token: this.signToken(user._id.toString(), user.email) };

    } catch (error) {
      this.logger.error("Error during sign in", error, AuthService.name);
      throw new InternalServerErrorException(error.message || 'Error happened while signing in');
    }
  }

  private signToken(userId: string, email: string) {
    return this.jwtService.sign({ sub: userId, email });
  }
}
