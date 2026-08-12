import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { ProjectsService } from '../projects/projects.service';

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

  async findAll(ownerId: string, projectId: string): Promise<Task[]> {
    await this.projectsService.findOne(ownerId, projectId);
    return this.tasksRepository.find({
      where: { projectId },
      order: { createdAt: 'DESC' },
    });
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
