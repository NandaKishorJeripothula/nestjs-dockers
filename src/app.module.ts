import { Module,HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DockerController } from './docker/docker.controller';
import { DockerModule } from './docker/docker.module';
import {DockerService} from './docker/docker.service'
@Module({
  imports: [DockerModule,HttpModule],
  controllers: [AppController, DockerController],
  providers: [AppService,DockerService],
})
export class AppModule {}
