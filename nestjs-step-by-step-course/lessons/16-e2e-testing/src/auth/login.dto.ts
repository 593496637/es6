import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength } from 'class-validator';
import { MaxByteLength } from '../common/max-byte-length.validator';

export class LoginDto {
  @ApiProperty({ example: 'student@example.com' })
  @IsEmail()
  @MaxLength(255)
  email!: string;

  @IsString()
  @MaxLength(72)
  @MaxByteLength(72)
  @ApiProperty({ example: 'LearnNest123!' })
  password!: string;
}
