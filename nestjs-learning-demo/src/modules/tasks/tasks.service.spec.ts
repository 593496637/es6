import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { ProjectsService } from '../projects/projects.service';
import { SortOrder, TaskSortBy } from './dto/query-tasks.dto';
import { TaskPriority, TaskStatus, Task } from './entities/task.entity';
import { TasksService } from './tasks.service';

type RepositoryMock<T extends object> = Partial<
  Record<keyof Repository<T>, jest.Mock>
>;

describe('TasksService', () => {
  let service: TasksService;
  let repository: RepositoryMock<Task>;
  let projectsService: { findOneOwned: jest.Mock };

  beforeEach(async () => {
    repository = {
      create: jest.fn((value: Partial<Task>) => value),
      save: jest.fn((value: Task) => Promise.resolve(value)),
      findOneBy: jest.fn(),
      findAndCount: jest.fn(),
      remove: jest.fn(),
    };
    projectsService = {
      findOneOwned: jest.fn().mockResolvedValue({ id: 'project-1' }),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: getRepositoryToken(Task), useValue: repository },
        { provide: ProjectsService, useValue: projectsService },
      ],
    }).compile();

    service = moduleRef.get(TasksService);
  });

  it('创建任务前校验项目归属并规范化字符串、空值和日期', async () => {
    const dueDate = '2026-09-01T12:00:00.000Z';
    const result = await service.create('project-1', 'user-1', {
      title: '  学习依赖注入  ',
      description: '   ',
      priority: TaskPriority.HIGH,
      dueDate,
    });

    expect(projectsService.findOneOwned).toHaveBeenCalledWith(
      'project-1',
      'user-1',
    );
    expect(repository.create).toHaveBeenCalledWith({
      projectId: 'project-1',
      title: '学习依赖注入',
      description: null,
      priority: TaskPriority.HIGH,
      dueDate: new Date(dueDate),
    });
    expect(result.title).toBe('学习依赖注入');
    expect(result.description).toBeNull();
    expect(result.dueDate).toEqual(new Date(dueDate));
  });

  it('查询任务时应用筛选、分页和稳定排序', async () => {
    const task = { id: 'task-1', projectId: 'project-1' } as Task;
    repository.findAndCount?.mockResolvedValue([[task], 41]);

    const result = await service.findAll('project-1', 'user-1', {
      page: 3,
      limit: 20,
      status: TaskStatus.DONE,
      priority: TaskPriority.HIGH,
      sortBy: TaskSortBy.DUE_DATE,
      order: SortOrder.ASC,
    });

    expect(projectsService.findOneOwned).toHaveBeenCalledWith(
      'project-1',
      'user-1',
    );
    expect(repository.findAndCount).toHaveBeenCalledWith({
      where: {
        projectId: 'project-1',
        status: TaskStatus.DONE,
        priority: TaskPriority.HIGH,
      },
      order: {
        dueDate: SortOrder.ASC,
        id: SortOrder.ASC,
      },
      skip: 40,
      take: 20,
    });
    expect(result).toEqual({
      data: [task],
      meta: {
        page: 3,
        limit: 20,
        total: 41,
        totalPages: 3,
      },
    });
  });

  it('找不到任务时抛出 404 领域异常', async () => {
    repository.findOneBy?.mockResolvedValue(null);

    await expect(
      service.findOne('project-1', 'task-1', 'user-1'),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('更新状态时只修改传入字段', async () => {
    const task = {
      id: 'task-1',
      projectId: 'project-1',
      title: '学习 Pipe',
      description: null,
      status: TaskStatus.TODO,
      priority: TaskPriority.MEDIUM,
      dueDate: null,
    } as Task;
    repository.findOneBy?.mockResolvedValue(task);

    const result = await service.update('project-1', 'task-1', 'user-1', {
      status: TaskStatus.DONE,
    });

    expect(result.status).toBe(TaskStatus.DONE);
    expect(result.title).toBe('学习 Pipe');
    expect(repository.save).toHaveBeenCalledWith(task);
  });

  it('更新时规范化传入字段并允许用 null 清空可空字段', async () => {
    const task = {
      id: 'task-1',
      projectId: 'project-1',
      title: '原任务名',
      description: '原描述',
      status: TaskStatus.TODO,
      priority: TaskPriority.MEDIUM,
      dueDate: new Date('2026-08-20T00:00:00.000Z'),
    } as Task;
    repository.findOneBy?.mockResolvedValue(task);

    const result = await service.update('project-1', 'task-1', 'user-1', {
      title: '  新任务名  ',
      description: null,
      dueDate: null,
    });

    expect(result).toBe(task);
    expect(result.title).toBe('新任务名');
    expect(result.description).toBeNull();
    expect(result.dueDate).toBeNull();
    expect(result.status).toBe(TaskStatus.TODO);
    expect(result.priority).toBe(TaskPriority.MEDIUM);
    expect(repository.save).toHaveBeenCalledWith(task);
  });

  it('更新非空日期时转换为 Date', async () => {
    const task = {
      id: 'task-1',
      projectId: 'project-1',
      title: '学习 Pipe',
      description: null,
      status: TaskStatus.TODO,
      priority: TaskPriority.MEDIUM,
      dueDate: null,
    } as Task;
    const dueDate = '2026-09-15T09:30:00.000Z';
    repository.findOneBy?.mockResolvedValue(task);

    const result = await service.update('project-1', 'task-1', 'user-1', {
      dueDate,
    });

    expect(result.dueDate).toEqual(new Date(dueDate));
  });

  it('删除前按项目和任务范围加载实体并删除', async () => {
    const task = { id: 'task-1', projectId: 'project-1' } as Task;
    repository.findOneBy?.mockResolvedValue(task);

    await service.remove('project-1', 'task-1', 'user-1');

    expect(projectsService.findOneOwned).toHaveBeenCalledWith(
      'project-1',
      'user-1',
    );
    expect(repository.findOneBy).toHaveBeenCalledWith({
      id: 'task-1',
      projectId: 'project-1',
    });
    expect(repository.remove).toHaveBeenCalledWith(task);
  });
});
