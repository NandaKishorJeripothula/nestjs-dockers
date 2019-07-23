import { Controller, Get, Post } from '@nestjs/common';
import { DockerService,DockerInstance } from './docker.service';


@Controller('docker')
export class DockerController {
    constructor(private readonly dockerService:DockerService){};
   @Get('create')
   getNewDockerInstance():DockerInstance{
       return this.dockerService.createNewInstance("nandaKishor","codercom/code-server  ");
   }
   @Get('stop')
   stopRunningInstance():String{
       return this.dockerService.killDockerInstance("616b6ebfd54f");
   }
   @Get('status')
   getInstanceStatus(name?:String,id?:String){
       return this.dockerService.isInstanceRunning(name,id);
   }
    @Get('all')
    getAllInstances():any{
        return this.dockerService.getAllInstances();
    }
}
