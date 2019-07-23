import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DockerService } from './docker/docker.service';
import { DockerController } from './docker/docker.controller';
import { DockerModule } from './docker/docker.module';

@Module({
  imports: [DockerModule],
  controllers: [AppController, DockerController],
  providers: [AppService, DockerService],
})
export class AppModule {}
