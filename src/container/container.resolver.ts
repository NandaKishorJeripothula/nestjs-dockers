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
         let response:ContainerAddressMessage={status:404, message:'Failed: Container May Not_Exist/Not_Runnig/Has_No_PubliC_Port', url:'null'};
        let allRuning = await this.allRunningContainers(args, info);
        if (!allRuning.length) {
            return response;
        }else{
            allRuning.forEach((container)=>{
                if(container.Id===args.data.Id){
                    if(container.Ports.length>0){
                        response.status=200;
                        response.message="Follow the url";
                        container.Ports.forEach(port=>{
                            response.url+=`http://localhost:${port.PublicPort} `
                        })
                    }else{
                        response.status=204;
                        response.message="No Public Port Available";
                        response.url="null"
                    }
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
