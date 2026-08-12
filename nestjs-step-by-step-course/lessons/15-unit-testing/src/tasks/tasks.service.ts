import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { ProjectsService } from '../projects/projects.service';
import type { QueryTasksDto } from './dto/query-tasks.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
    private readonly projectsService: ProjectsService,
  ) {}

  async create(
    ownerId: string,
    projectId: string,
    title: string,
  ): Promise<Task> {
    await this.projectsService.findOne(ownerId, projectId);
    const task = this.tasksRepository.create({
      projectId,
      title: title.trim(),
      done: false,
    });
    return this.tasksRepository.save(task);
  }

  async findAll(ownerId: string, projectId: string, query: QueryTasksDto) {
    await this.projectsService.findOne(ownerId, projectId);
    const [data, total] = await this.tasksRepository.findAndCount({
      where: {
        projectId,
        ...(query.done === undefined ? {} : { done: query.done }),
      },
      order: { [query.sortBy]: query.sortOrder, id: 'ASC' },
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    });
    return {
      data,
      meta: {
        page: query.page,
        limit: query.limit,
        total,
        totalPages: Math.ceil(total / query.limit),
      },
    };
  }

  async findOne(ownerId: string, projectId: string, id: string): Promise<Task> {
    await this.projectsService.findOne(ownerId, projectId);
    const task = await this.tasksRepository.findOneBy({ id, projectId });
    if (!task) throw new NotFoundException('任务不存在');
    return task;
  }

  async update(
    ownerId: string,
    projectId: string,
    id: string,
    input: { title?: string; done?: boolean },
  ): Promise<Task> {
    const task = await this.findOne(ownerId, projectId, id);
    if (input.title !== undefined) task.title = input.title.trim();
    if (input.done !== undefined) task.done = input.done;
    return this.tasksRepository.save(task);
  }

  async remove(ownerId: string, projectId: string, id: string): Promise<void> {
    const task = await this.findOne(ownerId, projectId, id);
    await this.tasksRepository.remove(task);
  }
}
