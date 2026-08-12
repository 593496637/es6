import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
  ) {}

  create(ownerId: string, name: string): Promise<Project> {
    return this.projectsRepository.save(
      this.projectsRepository.create({ ownerId, name: name.trim() }),
    );
  }

  findAll(ownerId: string): Promise<Project[]> {
    return this.projectsRepository.find({
      where: { ownerId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(ownerId: string, id: string): Promise<Project> {
    const project = await this.projectsRepository.findOneBy({ id, ownerId });
    if (!project) throw new NotFoundException('项目不存在');
    return project;
  }
}
