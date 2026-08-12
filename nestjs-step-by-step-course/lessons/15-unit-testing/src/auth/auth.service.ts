import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { UsersService, type PublicUser } from '../users/users.service';
import { LoginDto } from './login.dto';
import { RegisterDto } from './register.dto';

const DUMMY_HASH =
  '$2b$10$ZvUPVh/vB0hUTfwdSCKAXuH5LLcB6so32Wlk2DD2UsGw8spB3Pk52';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(
    dto: RegisterDto,
  ): Promise<{ accessToken: string; user: PublicUser }> {
    const passwordHash = await hash(dto.password, 10);
    const user = await this.usersService.create({
      email: dto.email,
      displayName: dto.displayName.trim(),
      passwordHash,
    });
    return this.response(this.usersService.toPublic(user));
  }

  async login(
    dto: LoginDto,
  ): Promise<{ accessToken: string; user: PublicUser }> {
    const user = await this.usersService.findByEmail(dto.email, true);
    const matches = await compare(
      dto.password,
      user?.passwordHash ?? DUMMY_HASH,
    );
    if (!user || !matches) throw new UnauthorizedException('邮箱或密码错误');
    return this.response(this.usersService.toPublic(user));
  }

  private async response(user: PublicUser) {
    return {
      accessToken: await this.jwtService.signAsync({ sub: user.id }),
      user,
    };
  }
}
