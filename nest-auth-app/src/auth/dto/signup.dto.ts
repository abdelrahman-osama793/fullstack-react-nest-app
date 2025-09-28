import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength, Matches, IsString } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'john@example.com' })
  email: string;

  @IsNotEmpty()
  @MinLength(3)
  @IsString()
  @ApiProperty({ example: 'John' })
  firstName: string;

  @IsNotEmpty()
  @MinLength(3)
  @IsString()
  @ApiProperty({ example: 'Doe' })
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(/(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+/, {
    message: 'Password must contain at least one letter, one number and one special character',
  })
  @ApiProperty({ example: 'Password123!' })
  password: string;
}
