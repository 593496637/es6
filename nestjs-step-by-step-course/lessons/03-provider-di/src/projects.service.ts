import { Injectable } from '@nestjs/common';

interface Project {
  id: string;
  name: string;
}

@Injectable()
export class ProjectsService {
  private readonly projects: Project[] = [{ id: 'p-1', name: '学习 NestJS' }];

  findAll(): Project[] {
    return this.projects;
  }

  findOne(id: string): Project | undefined {
    return this.projects.find((project) => project.id === id);
  }

  create(name: string): Project {
    const project = { id: `p-${this.projects.length + 1}`, name };
    this.projects.push(project);
    return project;
  }
}
