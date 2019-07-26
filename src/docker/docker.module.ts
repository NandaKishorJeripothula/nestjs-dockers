import { Module, HttpModule } from '@nestjs/common';
import { DockerService } from './docker.service';
@Module({
  imports: [HttpModule],
  providers: [DockerService],
  exports: [DockerService],
})
export class DockerModule {}
