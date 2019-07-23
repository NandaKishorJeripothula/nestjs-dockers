import { Injectable } from '@nestjs/common';
import { Docker, Options } from 'docker-cli-js';

const options = new Options(
  /* machineName */ null,
//   /* currentWorkingDirectory */ path.join(__dirname, '..', 'test', 'nginx')
);
let docker = new Docker(options);

export interface DockerInstance{
    url:String,
    password:String,
    port:Number,
    name:String,
    id:String,
}

@Injectable()
export class DockerService {
    createNewInstance(requestedName:String,imageName:String):DockerInstance{
        docker.command(`run -i -p 80:8443 ${imageName} --allow-http --no-auth`).then((data)=> {
            console.log('data = ', data);
          }).catch(error=>{
              console.log(error)
          });
          
        return {
            url:'',
            password:'',
            port:0,
            name:'',
            id:''
        }
    }
    killDockerInstance(name?:String,id?:String):String{
        docker.command(`container kill ${name?name:id}`);
        return 'KillDockerInstance-BeingImplemeneted';
    }
    isInstanceRunning(name?:String,id?:String):String{
        return 'isInstanceRunning-BeingImplemented';
    }

}
