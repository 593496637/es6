import { Controller, Get, Query } from '@nestjs/common';
import { HiService } from './hi.service';

@Controller('hi')
export class HiController {
  constructor(private readonly hiService: HiService) {}

  @Get()
  sayHi(@Query('name') name?: string) {
    return this.hiService.greet(name);
  }
}
