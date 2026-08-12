import { IsEmail, IsString, MaxLength } from 'class-validator';
import { MaxByteLength } from '../common/max-byte-length.validator';

export class LoginDto {
  @IsEmail()
  @MaxLength(255)
  email!: string;

  @IsString()
  @MaxLength(72)
  @MaxByteLength(72)
  password!: string;
}
