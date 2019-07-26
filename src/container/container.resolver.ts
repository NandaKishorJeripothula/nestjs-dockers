import { Query, Resolver, Args, Info, Mutation } from '@nestjs/graphql';
import { DockerService } from '../docker/docker.service';
import { Container,ContainerAddressMessage } from '../graphql.schema';
@Resolver('Container')

export class ContainerResolver {
    constructor(private readonly dockerService: DockerService) { }
    @Query('allContainers')
    async getAllContainers(@Args() args, @Info() info): Promise<Container[]> {
        return await this.dockerService.getAllContainers(args, info);
    }
    @Query('allRunningContainers')
    async allRunningContainers(@Args() args, @Info() info): Promise<Container[]> {
        return await this.dockerService.allRunningContainers(args, info);
    }
    @Query('getContainerLogs')
    async getContainerLogs(@Args() args, @Info() info): Promise<Container[]> {
        return await this.dockerService.getContainerLogs(args, info);
    }
    @Query('inspectContainer')
    async inspectContainer(@Args() args, @Info() info): Promise<any> {
        return await this.dockerService.inspectContainer(args, info);
    }

    @Query('getContainerAddress')
    async getContainerAddress(@Args() args, @Info() info): Promise<ContainerAddressMessage> {
         let response:ContainerAddressMessage={status:0, message:'', url:''};
        let allRuning = await this.allRunningContainers(args, info);
        if (!Array.isArray(allRuning)) {
            response.status=404;
            response.message="Failed: Container May not exist/not running/ no public port available"
        }else{
            allRuning.forEach((container)=>{
                if(container.Id===args.data.Id){
                    response.status=200;
                    response.message="Follow the url";
                    container.Ports.forEach(port=>{
                        response.url+=`http://localhost:${port.PublicPort} `
                    })
                }
            })

        }
        return response;

    }
    @Mutation('createNewContainer')
    async createNewContainer(@Args() args, @Info() info) {
        return await this.dockerService.createNewContainer(args, info);
    }
    @Mutation('startContainer')
    async startContainer(@Args() args, @Info() info) {
        return await this.dockerService.startContainer(args, info);
    }
    @Mutation('stopContainer')
    async stopContainer(@Args() args, @Info() info) {
        return await this.dockerService.stopContainer(args, info);
    }
    @Mutation('restartContainer')
    async restartContainer(@Args() args, @Info() info) {
        return await this.dockerService.restartContainer(args, info);
    }
    @Mutation('killContainer')
    async killContainer(@Args() args, @Info() info) {
        return await this.dockerService.killContainer(args, info);
    }
    @Mutation('removeContainer')
    async removeContainer(@Args() args, @Info() info) {
        return await this.dockerService.removeContainer(args, info);
    }


}
