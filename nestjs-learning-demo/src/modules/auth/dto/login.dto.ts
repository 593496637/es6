import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength } from 'class-validator';
import { Trim } from '../../../common/decorators/trim.decorator';
import { MaxByteLength } from '../../../common/validators/max-byte-length.validator';

export class LoginDto {
  @ApiProperty({ example: 'student@example.com' })
  @Trim()
  @IsEmail()
  @MaxLength(255)
  email!: string;

  @ApiProperty({ example: 'LearnNest123!' })
  @IsString()
  @MaxLength(72)
  @MaxByteLength(72, { message: 'password 的 UTF-8 编码不能超过 72 字节' })
  password!: string;
}
