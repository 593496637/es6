import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, Matches, MaxLength } from 'class-validator';
import { Trim } from '../../../common/decorators/trim.decorator';
import { MaxByteLength } from '../../../common/validators/max-byte-length.validator';

export class RegisterDto {
  @ApiProperty({ example: 'student@example.com' })
  @Trim()
  @IsEmail({}, { message: 'email 必须是有效邮箱' })
  @MaxLength(255)
  email!: string;

  @ApiProperty({ example: 'Nest 学习者' })
  @Trim()
  @IsString()
  @Length(2, 80, { message: 'displayName 长度必须在 2 到 80 之间' })
  displayName!: string;

  @ApiProperty({ example: 'LearnNest123!', minLength: 8 })
  @IsString()
  @Length(8, 72, { message: 'password 长度必须在 8 到 72 个字符之间' })
  @MaxByteLength(72, { message: 'password 的 UTF-8 编码不能超过 72 字节' })
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d).+$/, {
    message: 'password 至少包含一个字母和一个数字',
  })
  password!: string;
}
