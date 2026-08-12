import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
  ) {}

  create(ownerId: string, dto: CreateProjectDto): Promise<Project> {
    const project = this.projectsRepository.create({
      ...dto,
      name: dto.name.trim(),
      description: dto.description?.trim() || null,
      ownerId,
    });
    return this.projectsRepository.save(project);
  }

  findAllForOwner(ownerId: string): Promise<Project[]> {
    return this.projectsRepository.find({
      where: { ownerId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOneOwned(id: string, ownerId: string): Promise<Project> {
    const project = await this.projectsRepository.findOneBy({ id, ownerId });
    if (!project) throw new NotFoundException('项目不存在');
    return project;
  }

  async update(
    id: string,
    ownerId: string,
    dto: UpdateProjectDto,
  ): Promise<Project> {
    const project = await this.findOneOwned(id, ownerId);
    if (dto.name !== undefined) project.name = dto.name.trim();
    if (dto.description !== undefined) {
      project.description = dto.description?.trim() || null;
    }
    return this.projectsRepository.save(project);
  }

  async remove(id: string, ownerId: string): Promise<void> {
    const project = await this.findOneOwned(id, ownerId);
    await this.projectsRepository.remove(project);
  }
}
