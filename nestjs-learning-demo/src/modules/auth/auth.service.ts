import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import type { PublicUser } from '../users/users.service';
import { UsersService } from '../users/users.service';
import type { JwtPayload } from './auth.types';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

const DUMMY_PASSWORD_HASH =
  '$2b$10$ZvUPVh/vB0hUTfwdSCKAXuH5LLcB6so32Wlk2DD2UsGw8spB3Pk52';

export interface AuthResponse {
  accessToken: string;
  user: PublicUser;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(dto: RegisterDto): Promise<AuthResponse> {
    const rounds = this.configService.get<number>('auth.bcryptRounds', 10);
    const passwordHash = await hash(dto.password, rounds);
    const user = await this.usersService.create({
      email: dto.email,
      displayName: dto.displayName.trim(),
      passwordHash,
    });
    return this.createAuthResponse(this.usersService.toPublicUser(user));
  }

  async login(dto: LoginDto): Promise<AuthResponse> {
    const user = await this.usersService.findByEmail(dto.email, true);
    const passwordMatches = await compare(
      dto.password,
      user?.passwordHash ?? DUMMY_PASSWORD_HASH,
    );

    if (!user || !passwordMatches) {
      throw new UnauthorizedException('邮箱或密码错误');
    }

    return this.createAuthResponse(this.usersService.toPublicUser(user));
  }

  private async createAuthResponse(user: PublicUser): Promise<AuthResponse> {
    const payload: JwtPayload = { sub: user.id };
    return {
      accessToken: await this.jwtService.signAsync(payload),
      user,
    };
  }
}
