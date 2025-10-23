import { Controller, Get } from '@nestjs/common';

@Controller('hi')
export class HiController {
  @Get()
  sayHi(): string {
    return 'Hi there!';
  }
}
