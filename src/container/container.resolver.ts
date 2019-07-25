import { Query, Resolver, Args, Info } from '@nestjs/graphql';
import { DockerService } from '../docker/docker.service';
import { Container } from '../graphql.schema';
@Resolver('Container')
export class ContainerResolver {
    constructor(private readonly dockerService: DockerService) { }
    @Query('allContainers')
    async getAllContainers(@Args() args, @Info() info): Promise<Container[]> {
        console.log(args, info);
        return await this.dockerService.getAllContainers(args,info);
    }
    // getAllContainers(@Args args, @Info info): Promise<Container[]>{

    // }
}
