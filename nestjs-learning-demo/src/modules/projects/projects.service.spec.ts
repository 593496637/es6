import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { ProjectsService } from './projects.service';

type RepositoryMock<T extends object> = Partial<
  Record<keyof Repository<T>, jest.Mock>
>;

describe('ProjectsService', () => {
  let service: ProjectsService;
  let repository: RepositoryMock<Project>;

  beforeEach(async () => {
    repository = {
      create: jest.fn((value: Partial<Project>) => value),
      find: jest.fn(),
      findOneBy: jest.fn(),
      remove: jest.fn(),
      save: jest.fn((value: Project) => Promise.resolve(value)),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        ProjectsService,
        { provide: getRepositoryToken(Project), useValue: repository },
      ],
    }).compile();

    service = moduleRef.get(ProjectsService);
  });

  it('创建项目时规范化名称和空白描述', async () => {
    const result = await service.create('owner-1', {
      name: '  NestJS 课程  ',
      description: '   ',
    });

    expect(repository.create).toHaveBeenCalledWith({
      name: 'NestJS 课程',
      description: null,
      ownerId: 'owner-1',
    });
    expect(repository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'NestJS 课程',
        description: null,
        ownerId: 'owner-1',
      }),
    );
    expect(result.description).toBeNull();
  });

  it('项目列表查询始终限制在当前所有者范围内', async () => {
    repository.find?.mockResolvedValue([]);

    await service.findAllForOwner('owner-1');

    expect(repository.find).toHaveBeenCalledWith({
      where: { ownerId: 'owner-1' },
      order: { createdAt: 'DESC' },
    });
  });

  it('项目详情同时使用项目 ID 和所有者 ID 查询', async () => {
    const project = { id: 'project-1', ownerId: 'owner-1' } as Project;
    repository.findOneBy?.mockResolvedValue(project);

    const result = await service.findOneOwned('project-1', 'owner-1');

    expect(repository.findOneBy).toHaveBeenCalledWith({
      id: 'project-1',
      ownerId: 'owner-1',
    });
    expect(result).toBe(project);
  });

  it('项目不属于当前所有者时返回 404', async () => {
    repository.findOneBy?.mockResolvedValue(null);

    await expect(
      service.findOneOwned('project-1', 'other-owner'),
    ).rejects.toMatchObject({
      status: 404,
      message: '项目不存在',
    });
    expect(repository.findOneBy).toHaveBeenCalledWith({
      id: 'project-1',
      ownerId: 'other-owner',
    });
  });

  it('部分更新时保留未传字段并允许用 null 清空描述', async () => {
    const project = {
      id: 'project-1',
      ownerId: 'owner-1',
      name: '原项目名',
      description: '原描述',
    } as Project;
    repository.findOneBy?.mockResolvedValue(project);

    const result = await service.update('project-1', 'owner-1', {
      description: null,
    });

    expect(result.name).toBe('原项目名');
    expect(result.description).toBeNull();
    expect(repository.save).toHaveBeenCalledWith(project);
  });

  it('删除前按所有者范围加载项目并删除该实体', async () => {
    const project = { id: 'project-1', ownerId: 'owner-1' } as Project;
    repository.findOneBy?.mockResolvedValue(project);

    await service.remove('project-1', 'owner-1');

    expect(repository.findOneBy).toHaveBeenCalledWith({
      id: 'project-1',
      ownerId: 'owner-1',
    });
    expect(repository.remove).toHaveBeenCalledWith(project);
  });
});
