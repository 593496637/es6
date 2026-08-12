import { Body, Controller, Get, Param, Post } from '@nestjs/common';

interface CreateProjectBody {
  name: string;
}

@Controller()
export class AppController {
  @Get('projects')
  findAll() {
    return [{ id: 'p-1', name: '学习 NestJS' }];
  }

  @Get('projects/:id')
  findOne(@Param('id') id: string) {
    return { id, name: '学习 NestJS' };
  }

  @Post('projects')
  create(@Body() body: CreateProjectBody) {
    return { id: 'p-new', name: body.name };
  }
}
