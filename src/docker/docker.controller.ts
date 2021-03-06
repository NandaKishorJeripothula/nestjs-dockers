import { Controller, Get, Post, Param } from '@nestjs/common';
import { DockerService } from './docker.service';

@Controller('docker')
export class DockerController {
    constructor(private readonly dockerService: DockerService) { };
    @Get('create')
    async getNewDockerInstance(): Promise<String> {
        return ""
    }
    @Get('start')
    async startExistingInstance(): Promise<String> {
        return "";
    }
    @Get('stop')
    stopRunningInstance(): String {
        return "Stop Runinnng Istance"
    }
    @Get('status')
    getInstanceStatus(name?: String, id?: String) {
        return "getStatus"
    }
    @Get('running')
    getAllRunningInstances(): any {
        return this.dockerService.getRunningInstances().then(data=>data.length?this.getRequiredData(data):data);
    }
    @Get('all')
    getAllInstances(): any {   
        return this.dockerService.getAllRunningInstances().then(data=>data.length?this.getRequiredData(data):data)
    }

    @Post('logs')    
    getInstanceLogs(@Param('id') id:String):any{
        console.log("id:" ,id)
        return this.dockerService.getInstanceLogs(id);
    }

    getRequiredData(data):any{
        let a = [];
        data.forEach(({ Id, Names, Image, State, Status }) => {
            a.push ({ Id, Names:Names[0], Image, State, Status })
        })
        return a;
    }
}

