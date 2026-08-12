import { IsEmail, IsString, Length, Matches, MaxLength } from 'class-validator';
import { MaxByteLength } from '../common/max-byte-length.validator';

export class RegisterDto {
  @IsEmail()
  @MaxLength(255)
  email!: string;

  @IsString()
  @Length(2, 80)
  displayName!: string;

  @IsString()
  @Length(8, 72)
  @MaxByteLength(72)
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d).+$/, {
    message: 'password 至少包含字母和数字',
  })
  password!: string;
}
