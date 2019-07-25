import { Query, Resolver, Args, Info, Mutation } from '@nestjs/graphql';
import { DockerService } from '../docker/docker.service';
import { Container } from '../graphql.schema';
@Resolver('Container')
export class ContainerResolver {
    constructor(private readonly dockerService: DockerService) { }
    @Query('allContainers')
    async getAllContainers(@Args() args, @Info() info): Promise<Container[]> {
        return await this.dockerService.getAllContainers(args,info);
    }
    @Query('allRunningContainers')
    async allRunningContainers(@Args() args, @Info() info): Promise<Container[]> {
        return await this.dockerService.allRunningContainers(args,info);
    }
    @Mutation('createNewContainer')
    async createNewContainer(@Args() args, @Info() info){
        return await this.dockerService.createNewContainer(args,info);
    }
}
