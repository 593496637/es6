import { Injectable, NotFoundException } from '@nestjs/common';
import type { Task } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private nextId = 1;

  create(title: string): Task {
    const task = { id: this.nextId++, title: title.trim(), done: false };
    this.tasks.push(task);
    return task;
  }

  findAll(): Task[] {
    return this.tasks;
  }

  findOne(id: number): Task {
    const task = this.tasks.find((item) => item.id === id);
    if (!task) throw new NotFoundException('任务不存在');
    return task;
  }

  update(id: number, input: { title?: string; done?: boolean }): Task {
    const task = this.findOne(id);
    if (input.title !== undefined) task.title = input.title.trim();
    if (input.done !== undefined) task.done = input.done;
    return task;
  }

  remove(id: number): void {
    this.findOne(id);
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
