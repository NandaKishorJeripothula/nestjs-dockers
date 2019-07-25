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
    @Query('getContainerLogs')
    async getContainerLogs(@Args() args, @Info() info): Promise<Container[]> {
        return await this.dockerService.getContainerLogs(args,info);
    }

    @Mutation('createNewContainer')
    async createNewContainer(@Args() args, @Info() info){
        return await this.dockerService.createNewContainer(args,info);
    }
    @Mutation('startContainer')
    async startContainer(@Args() args, @Info() info){
        return await this.dockerService.startContainer(args,info);
    }
    @Mutation('stopRunningContainer')
    async stopRunningContainer(@Args() args, @Info() info){
        return await this.dockerService.stopRunningContainer(args,info);
    }
    @Mutation('restartContainer')
    async restartContainer(@Args() args, @Info() info){
        return await this.dockerService.restartContainer(args,info);
    }
    @Mutation('killContainer')
    async killContainer(@Args() args, @Info() info){
        return await this.dockerService.killContainer(args,info);
    }
    @Mutation('removeContainer')
    async removeContainer(@Args() args, @Info() info){
        return await this.dockerService.removeContainer(args,info);
    }
    
}
