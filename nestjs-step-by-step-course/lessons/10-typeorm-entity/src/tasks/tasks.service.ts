import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) {}

  async create(title: string): Promise<Task> {
    const task = this.tasksRepository.create({
      title: title.trim(),
      done: false,
    });
    return this.tasksRepository.save(task);
  }

  findAll(): Promise<Task[]> {
    return this.tasksRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOneBy({ id });
    if (!task) throw new NotFoundException('任务不存在');
    return task;
  }

  async update(
    id: string,
    input: { title?: string; done?: boolean },
  ): Promise<Task> {
    const task = await this.findOne(id);
    if (input.title !== undefined) task.title = input.title.trim();
    if (input.done !== undefined) task.done = input.done;
    return this.tasksRepository.save(task);
  }

  async remove(id: string): Promise<void> {
    const task = await this.findOne(id);
    await this.tasksRepository.remove(task);
  }
}
