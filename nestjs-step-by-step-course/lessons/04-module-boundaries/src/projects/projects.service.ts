import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectsService {
  private readonly projects = [{ id: 'p-1', name: '学习 NestJS' }];

  findAll() {
    return this.projects;
  }

  findOne(id: string) {
    return this.projects.find((project) => project.id === id);
  }

  create(name: string) {
    const project = { id: `p-${this.projects.length + 1}`, name };
    this.projects.push(project);
    return project;
  }
}
