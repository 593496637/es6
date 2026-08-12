import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from './common/decorators/public.decorator';

@ApiTags('app')
@Controller()
export class AppController {
  @Public()
  @Get()
  @ApiOperation({ summary: '课程 Demo 入口' })
  getWelcome() {
    return {
      name: 'TaskFlow NestJS Learning Demo',
      message: '欢迎！请按 COURSE.md 从第 00 课开始学习。',
      docs: '设置 SWAGGER_ENABLED=true 后访问 /api/docs',
      health: '/api/health/live',
    };
  }
}
