import { Module } from '@nestjs/common';
import { ContainerResolver } from './container.resolver';
import { DockerModule } from '../docker/docker.module';

@Module({
  imports: [DockerModule],
  providers: [ContainerResolver],
})
export class ContainerModule {}
