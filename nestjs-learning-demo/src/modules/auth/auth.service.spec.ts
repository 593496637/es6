import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { compare, hash } from 'bcryptjs';
import { User } from '../users/entities/user.entity';
import type { PublicUser } from '../users/users.service';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

const compareMock = compare as unknown as jest.MockedFunction<
  (plainText: string, passwordHash: string) => Promise<boolean>
>;
const hashMock = hash as unknown as jest.MockedFunction<
  (plainText: string, rounds: number) => Promise<string>
>;

describe('AuthService', () => {
  let service: AuthService;
  let usersService: {
    create: jest.Mock;
    findByEmail: jest.Mock;
    toPublicUser: jest.Mock;
  };
  let jwtService: { signAsync: jest.Mock };
  let configService: { get: jest.Mock };

  const password = 'LearnNest123!';
  const passwordHash = 'stored-password-hash';
  const user = {
    id: 'user-1',
    email: 'student@example.com',
    displayName: 'Nest 学习者',
    passwordHash,
    createdAt: new Date('2026-08-12T00:00:00.000Z'),
    updatedAt: new Date('2026-08-12T00:00:00.000Z'),
  } as User;
  const publicUser: PublicUser = {
    id: user.id,
    email: user.email,
    displayName: user.displayName,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  beforeEach(async () => {
    compareMock.mockReset();
    hashMock.mockReset();
    usersService = {
      create: jest.fn(),
      findByEmail: jest.fn(),
      toPublicUser: jest.fn().mockReturnValue(publicUser),
    };
    jwtService = {
      signAsync: jest.fn().mockResolvedValue('signed-access-token'),
    };
    configService = {
      get: jest.fn().mockReturnValue(10),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: jwtService },
        { provide: ConfigService, useValue: configService },
      ],
    }).compile();

    service = moduleRef.get(AuthService);
  });

  it('注册时只返回公开用户信息，不泄露密码或哈希', async () => {
    hashMock.mockResolvedValue(passwordHash);
    usersService.create.mockResolvedValue(user);

    const result = await service.register({
      email: 'student@example.com',
      displayName: ' Nest 学习者 ',
      password,
    });

    expect(hashMock).toHaveBeenCalledWith(password, 10);
    expect(usersService.create).toHaveBeenCalledWith({
      email: 'student@example.com',
      displayName: 'Nest 学习者',
      passwordHash,
    });
    expect(result).toEqual({
      accessToken: 'signed-access-token',
      user: publicUser,
    });
    expect(result.user).not.toHaveProperty('passwordHash');
    expect(JSON.stringify(result)).not.toContain(password);
    expect(JSON.stringify(result)).not.toContain(passwordHash);
  });

  it('密码正确时签发 token 并返回公开用户', async () => {
    usersService.findByEmail.mockResolvedValue(user);
    compareMock.mockResolvedValue(true);

    const result = await service.login({
      email: 'student@example.com',
      password,
    });

    expect(usersService.findByEmail).toHaveBeenCalledWith(
      'student@example.com',
      true,
    );
    expect(compareMock).toHaveBeenCalledWith(password, passwordHash);
    expect(jwtService.signAsync).toHaveBeenCalledWith({
      sub: publicUser.id,
    });
    expect(result).toEqual({
      accessToken: 'signed-access-token',
      user: publicUser,
    });
  });

  it('密码错误时返回不暴露账号状态的统一 401', async () => {
    usersService.findByEmail.mockResolvedValue(user);
    compareMock.mockResolvedValue(false);

    await expect(
      service.login({
        email: 'student@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toMatchObject({
      status: 401,
      message: '邮箱或密码错误',
    });
  });

  it('用户不存在时仍执行密码比较并返回相同的 401', async () => {
    usersService.findByEmail.mockResolvedValue(null);
    compareMock.mockResolvedValue(false);

    const login = service.login({
      email: 'missing@example.com',
      password: 'wrong-password',
    });

    await expect(login).rejects.toBeInstanceOf(UnauthorizedException);
    await expect(login).rejects.toMatchObject({
      status: 401,
      message: '邮箱或密码错误',
    });
    expect(compareMock).toHaveBeenCalledTimes(1);
    expect(compareMock).toHaveBeenCalledWith(
      'wrong-password',
      expect.any(String),
    );
  });
});
