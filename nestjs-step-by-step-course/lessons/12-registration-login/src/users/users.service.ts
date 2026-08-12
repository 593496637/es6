import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

export type PublicUser = Omit<User, 'passwordHash'>;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(input: {
    email: string;
    displayName: string;
    passwordHash: string;
  }): Promise<User> {
    const email = input.email.trim().toLowerCase();
    if (await this.findByEmail(email))
      throw new ConflictException('该邮箱已经注册');
    try {
      return await this.usersRepository.save(
        this.usersRepository.create({ ...input, email }),
      );
    } catch (error) {
      if (
        error instanceof Error &&
        'code' in error &&
        error.code === 'SQLITE_CONSTRAINT_UNIQUE'
      ) {
        throw new ConflictException('该邮箱已经注册');
      }
      throw error;
    }
  }

  findByEmail(email: string, includePassword = false): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { email: email.trim().toLowerCase() },
      select: includePassword
        ? {
            id: true,
            email: true,
            displayName: true,
            passwordHash: true,
            createdAt: true,
            updatedAt: true,
          }
        : undefined,
    });
  }

  toPublic(user: User): PublicUser {
    const { passwordHash: _passwordHash, ...publicUser } = user;
    return publicUser;
  }
}
