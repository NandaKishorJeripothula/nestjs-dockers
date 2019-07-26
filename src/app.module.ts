import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DockerModule } from './docker/docker.module';
import { DockerService } from './docker/docker.service'
import { GqlConfigService } from './graphql.config';
import { GraphQLModule } from '@nestjs/graphql';
import { ContainerModule } from './container/container.module';


@Module({
  imports: [
    // Since graphql ooptions script need to be executed
    // everytime when schema changes to get updated schema
    // Passing it to app module will take care of the things
    GraphQLModule.forRootAsync({
      useClass: GqlConfigService,
    }),
    DockerModule,
    HttpModule,
    ContainerModule
  ],
  controllers: [AppController],
  providers: [AppService, DockerService],
})
export class AppModule { }

