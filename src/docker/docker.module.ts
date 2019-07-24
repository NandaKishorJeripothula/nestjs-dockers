import { Module, HttpModule } from '@nestjs/common';
import { DockerController } from './docker.controller';
import { DockerService } from './docker.service';
@Module({
    imports:[HttpModule],
    controllers:[DockerController],
    providers:[DockerService]
})
export class DockerModule {}
