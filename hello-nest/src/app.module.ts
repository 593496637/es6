import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HiController } from './hi/hi.controller';
import { HiService } from './hi/hi.service';

@Module({
  imports: [],
  controllers: [AppController, HiController],
  providers: [AppService, HiService],
})
export class AppModule {}
