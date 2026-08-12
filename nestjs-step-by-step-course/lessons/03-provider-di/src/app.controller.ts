import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProjectsService } from './projects.service';

interface CreateProjectBody {
  name: string;
}

@Controller()
export class AppController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get('projects')
  findAll() {
    return this.projectsService.findAll();
  }

  @Get('projects/:id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Post('projects')
  create(@Body() body: CreateProjectBody) {
    return this.projectsService.create(body.name);
  }
}
