import { ConflictException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserInput, UsersService } from './users.service';

type RepositoryMock<T extends object> = Partial<
  Record<keyof Repository<T>, jest.Mock>
>;

describe('UsersService', () => {
  let service: UsersService;
  let repository: RepositoryMock<User>;

  const input: CreateUserInput = {
    email: ' Student@Example.com ',
    displayName: 'Nest 学习者',
    passwordHash: 'hashed-password',
  };

  beforeEach(async () => {
    repository = {
      create: jest.fn((value: Partial<User>) => value),
      findOne: jest.fn(),
      save: jest.fn(),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: repository },
      ],
    }).compile();

    service = moduleRef.get(UsersService);
  });

  it('并发写入触发唯一约束时转换为 409', async () => {
    const uniqueConstraintError = Object.assign(
      new Error('UNIQUE constraint failed: users.email'),
      { code: 'SQLITE_CONSTRAINT_UNIQUE' },
    );
    repository.findOne?.mockResolvedValue(null);
    repository.save?.mockRejectedValue(uniqueConstraintError);

    const creation = service.create(input);

    await expect(creation).rejects.toBeInstanceOf(ConflictException);
    await expect(creation).rejects.toMatchObject({
      status: 409,
      message: '该邮箱已经注册',
    });
    expect(repository.create).toHaveBeenCalledWith({
      ...input,
      email: 'student@example.com',
    });
    expect(repository.save).toHaveBeenCalledTimes(1);
  });

  it('意外数据库错误保持原样向上抛出', async () => {
    const databaseError = new Error('database connection lost');
    repository.findOne?.mockResolvedValue(null);
    repository.save?.mockRejectedValue(databaseError);

    await expect(service.create(input)).rejects.toBe(databaseError);
  });
});
