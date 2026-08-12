import {
  ExecutionContext,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import type { PublicUser } from '../../modules/users/users.service';
import { UsersService } from '../../modules/users/users.service';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { JwtAuthGuard } from './jwt-auth.guard';

interface TestRequest {
  headers: { authorization?: string };
  user?: {
    id: string;
    email: string;
    displayName: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;
  let getAllAndOverride: jest.Mock;
  let verifyAsync: jest.Mock;
  let findPublicById: jest.Mock;

  const publicUser: PublicUser = {
    id: 'user-1',
    email: 'current@example.com',
    displayName: '当前用户名',
    createdAt: new Date('2026-08-12T00:00:00.000Z'),
    updatedAt: new Date('2026-08-13T00:00:00.000Z'),
  };

  const handler = jest.fn();
  class TestController {}

  const createContext = (request: TestRequest): ExecutionContext =>
    ({
      getHandler: () => handler,
      getClass: () => TestController,
      switchToHttp: () => ({ getRequest: () => request }),
    }) as unknown as ExecutionContext;

  beforeEach(() => {
    getAllAndOverride = jest.fn().mockReturnValue(false);
    verifyAsync = jest.fn();
    findPublicById = jest.fn();
    guard = new JwtAuthGuard(
      { getAllAndOverride } as unknown as Reflector,
      { verifyAsync } as unknown as JwtService,
      { findPublicById } as unknown as UsersService,
    );
  });

  it('公开路由不要求 token', async () => {
    getAllAndOverride.mockReturnValue(true);

    await expect(
      guard.canActivate(createContext({ headers: {} })),
    ).resolves.toBe(true);
    expect(getAllAndOverride).toHaveBeenCalledWith(IS_PUBLIC_KEY, [
      handler,
      TestController,
    ]);
    expect(verifyAsync).not.toHaveBeenCalled();
    expect(findPublicById).not.toHaveBeenCalled();
  });

  it('受保护路由缺少 Bearer token 时返回 401', async () => {
    await expect(
      guard.canActivate(createContext({ headers: {} })),
    ).rejects.toMatchObject({
      status: 401,
      message: '缺少 Bearer Token',
    });
    expect(verifyAsync).not.toHaveBeenCalled();
    expect(findPublicById).not.toHaveBeenCalled();
  });

  it('有效 token 通过验证并写入当前用户', async () => {
    const request: TestRequest = {
      headers: { authorization: 'Bearer valid-token' },
    };
    verifyAsync.mockResolvedValue({
      sub: 'user-1',
    });
    findPublicById.mockResolvedValue(publicUser);

    await expect(guard.canActivate(createContext(request))).resolves.toBe(true);

    expect(verifyAsync).toHaveBeenCalledWith('valid-token');
    expect(findPublicById).toHaveBeenCalledWith('user-1');
    expect(request.user).toEqual(publicUser);
  });

  it('无效或过期 token 返回统一 401', async () => {
    verifyAsync.mockRejectedValue(new Error('invalid signature'));

    await expect(
      guard.canActivate(
        createContext({
          headers: { authorization: 'Bearer invalid-token' },
        }),
      ),
    ).rejects.toBeInstanceOf(UnauthorizedException);
    expect(verifyAsync).toHaveBeenCalledWith('invalid-token');
    expect(findPublicById).not.toHaveBeenCalled();
  });

  it('token 有效但用户已不存在时返回 401', async () => {
    verifyAsync.mockResolvedValue({ sub: 'deleted-user' });
    findPublicById.mockRejectedValue(new NotFoundException('用户不存在'));

    await expect(
      guard.canActivate(
        createContext({
          headers: { authorization: 'Bearer valid-token' },
        }),
      ),
    ).rejects.toBeInstanceOf(UnauthorizedException);
    expect(verifyAsync).toHaveBeenCalledWith('valid-token');
    expect(findPublicById).toHaveBeenCalledWith('deleted-user');
  });
});
