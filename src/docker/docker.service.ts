import { Injectable } from '@nestjs/common';
import { Docker, Options } from 'docker-cli-js';

const options = new Options(
  /* machineName */ null,
    //   /* currentWorkingDirectory */ path.join(__dirname, '..', 'test', 'nginx')
);
let docker = new Docker(options);

export interface DockerInstance {
    url: String,
    password: String,
    port: Number,
    name: String,
    id: String,
}

@Injectable()
export class DockerService {
    getAllInstances():any{
        docker.command('ps', (error, data) => {
            if (!error)
                return data;
            else
                return error;
        });
    }
    createNewInstance(requestedName: String, imageName: String): DockerInstance {
        docker.command(`run -i --name abc -P ${imageName} --allow-http --no-auth`, (error, data) => {
            if (!error) {
                console.log("PPPPPPPPPP+\n", data);
            }
            else
               { console.error(error);}
        
        });
        return {
            url: '',
            password: '',
            port: 0,
            name: '',
            id: ''
        }
    }
        killDockerInstance(name ?: String, id ?: String): String{
           
            docker.command(`container kill ${name ? name : id}`).then(data => console.log(data));

            return 'KillDockerInstance-BeingImplemeneted';
        }
        isInstanceRunning(name ?: String, id ?: String): String{
            return 'isInstanceRunning-BeingImplemented';
        }

    }
