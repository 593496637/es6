import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { hash } from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  const usersService = {
    findByEmail: jest.fn(),
    toPublic: jest.fn(),
  };
  const jwtService = { signAsync: jest.fn() };
  let service: AuthService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();
    service = module.get(AuthService);
  });

  it('正确密码签发只含 sub 的 JWT', async () => {
    const user = {
      id: 'user-1',
      email: 'student@example.com',
      passwordHash: await hash('LearnNest123!', 4),
    };
    usersService.findByEmail.mockResolvedValue(user);
    usersService.toPublic.mockReturnValue({ id: user.id, email: user.email });
    jwtService.signAsync.mockResolvedValue('token');

    const result = await service.login({
      email: user.email,
      password: 'LearnNest123!',
    });

    expect(jwtService.signAsync).toHaveBeenCalledWith({ sub: 'user-1' });
    expect(result.accessToken).toBe('token');
  });

  it('错误密码返回 401', async () => {
    usersService.findByEmail.mockResolvedValue(null);
    await expect(
      service.login({ email: 'missing@example.com', password: 'Wrong123!' }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });
});
