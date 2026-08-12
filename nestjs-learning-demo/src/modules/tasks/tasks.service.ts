import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsOrder, FindOptionsWhere, Repository } from 'typeorm';
import { ProjectsService } from '../projects/projects.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { QueryTasksDto, SortOrder } from './dto/query-tasks.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

export interface PaginatedTasks {
  data: Task[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
    private readonly projectsService: ProjectsService,
  ) {}

  async create(
    projectId: string,
    ownerId: string,
    dto: CreateTaskDto,
  ): Promise<Task> {
    await this.projectsService.findOneOwned(projectId, ownerId);
    const task = this.tasksRepository.create({
      ...dto,
      projectId,
      title: dto.title.trim(),
      description: dto.description?.trim() || null,
      dueDate: dto.dueDate ? new Date(dto.dueDate) : null,
    });
    return this.tasksRepository.save(task);
  }

  async findAll(
    projectId: string,
    ownerId: string,
    query: QueryTasksDto,
  ): Promise<PaginatedTasks> {
    await this.projectsService.findOneOwned(projectId, ownerId);

    const where: FindOptionsWhere<Task> = { projectId };
    if (query.status) where.status = query.status;
    if (query.priority) where.priority = query.priority;

    const order: FindOptionsOrder<Task> = {
      [query.sortBy]: query.order,
      id: SortOrder.ASC,
    };
    const [data, total] = await this.tasksRepository.findAndCount({
      where,
      order,
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

  async findOne(
    projectId: string,
    taskId: string,
    ownerId: string,
  ): Promise<Task> {
    await this.projectsService.findOneOwned(projectId, ownerId);
    const task = await this.tasksRepository.findOneBy({
      id: taskId,
      projectId,
    });
    if (!task) throw new NotFoundException('任务不存在');
    return task;
  }

  async update(
    projectId: string,
    taskId: string,
    ownerId: string,
    dto: UpdateTaskDto,
  ): Promise<Task> {
    const task = await this.findOne(projectId, taskId, ownerId);
    if (dto.title !== undefined) task.title = dto.title.trim();
    if (dto.description !== undefined) {
      task.description = dto.description?.trim() || null;
    }
    if (dto.status !== undefined) task.status = dto.status;
    if (dto.priority !== undefined) task.priority = dto.priority;
    if (dto.dueDate !== undefined) {
      task.dueDate = dto.dueDate ? new Date(dto.dueDate) : null;
    }
    return this.tasksRepository.save(task);
  }

  async remove(
    projectId: string,
    taskId: string,
    ownerId: string,
  ): Promise<void> {
    const task = await this.findOne(projectId, taskId, ownerId);
    await this.tasksRepository.remove(task);
  }
}
