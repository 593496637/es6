import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  welcome() {
    return { message: 'NestJS 已经启动，我的第一条路由成功了！' };
  }
}
