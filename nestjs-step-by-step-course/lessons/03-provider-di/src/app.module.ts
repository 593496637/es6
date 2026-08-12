import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProjectsService } from './projects.service';

@Module({ controllers: [AppController], providers: [ProjectsService] })
export class AppModule {}
