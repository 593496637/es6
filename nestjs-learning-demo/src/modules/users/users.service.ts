import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

export interface CreateUserInput {
  email: string;
  displayName: string;
  passwordHash: string;
}

export type PublicUser = Omit<User, 'passwordHash' | 'projects'>;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(input: CreateUserInput): Promise<User> {
    const email = input.email.trim().toLowerCase();
    const existingUser = await this.findByEmail(email);
    if (existingUser) throw new ConflictException('该邮箱已经注册');

    const user = this.usersRepository.create({ ...input, email });
    try {
      return await this.usersRepository.save(user);
    } catch (error) {
      if (this.isUniqueConstraintError(error)) {
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

  async findPublicById(id: string): Promise<PublicUser> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('用户不存在');
    return this.toPublicUser(user);
  }

  toPublicUser(user: User): PublicUser {
    return {
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  private isUniqueConstraintError(error: unknown): boolean {
    return (
      error instanceof Error &&
      'code' in error &&
      (error as Error & { code?: string }).code === 'SQLITE_CONSTRAINT_UNIQUE'
    );
  }
}
