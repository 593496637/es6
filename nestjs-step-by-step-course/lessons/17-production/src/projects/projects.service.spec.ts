import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { Project } from './project.entity';
import { ProjectsService } from './projects.service';

describe('ProjectsService', () => {
  let service: ProjectsService;
  let repository: jest.Mocked<Pick<Repository<Project>, 'findOneBy'>>;

  beforeEach(async () => {
    repository = { findOneBy: jest.fn() };
    const module = await Test.createTestingModule({
      providers: [
        ProjectsService,
        { provide: getRepositoryToken(Project), useValue: repository },
      ],
    }).compile();
    service = module.get(ProjectsService);
  });

  it('查询详情时把 ownerId 放进数据库条件', async () => {
    const project = { id: 'project-1', ownerId: 'user-1' } as Project;
    repository.findOneBy.mockResolvedValue(project);

    await expect(service.findOne('user-1', 'project-1')).resolves.toBe(project);
    expect(repository.findOneBy).toHaveBeenCalledWith({
      id: 'project-1',
      ownerId: 'user-1',
    });
  });

  it('不存在或越权都返回同一个 404', async () => {
    repository.findOneBy.mockResolvedValue(null);
    await expect(
      service.findOne('other-user', 'project-1'),
    ).rejects.toBeInstanceOf(NotFoundException);
  });
});
