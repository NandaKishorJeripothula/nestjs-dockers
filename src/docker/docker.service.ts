import { Injectable, HttpService } from '@nestjs/common';
import { identifier, thisExpression } from '@babel/types';
const url = "http://localhost:2375";
@Injectable()
export class DockerService {
    constructor(private readonly httpService: HttpService) { }
    async getRunningInstances(): Promise<any> {
        return await this.httpService.get(`${url}/containers/json`)
            .toPromise()
            .then(res => {
                if (res.status === 200)
                    return res.data
                else {
                    const { status, data } = res;
                    return {
                        statusCode: status,
                        message: data.message
                    }
                }
            })
            .then(data => data)
            .catch(error => Error(error));
    }
    async getAllRunningInstances(): Promise<any> {
        return await this.httpService.get(`${url}/containers/json?all=true`)
            .toPromise()
            .then(res => res.status === 200 ? res.data : res.data.message)
            .then(data => data)
            .catch(error => Error(error));
    }
    async getInstanceLogs(id: String): Promise<any> {
        return await this.httpService.get(`${url}/containers/${id}/logs`)
            .toPromise()
            .then(res => res.status == 200 ? res.data : Error("Unable to Get Logs"))
            .catch(error => Error(error));
    }
    async createNewContainer(requestedName: String, image: String, commands: String[]): Promise<String> {
        return await this.httpService.post(
            `${url}/containers/create/?name=${requestedName}`,
            {
                Image: image,
                Cmd: commands,
            }
        )
            .toPromise()
            .then(res => res.status === 201 ? res.data.Id : res.data.message)
            .catch(error => Error(error));
    }
    async startInstance(id: String): Promise<String> {
        return await this.httpService.post(`${url}/containers/${id}/start`)
            .toPromise()
            .then(res => res.status === 204 ? 'Container Started Successfully' : res.data.message)
            .catch(error => Error(error));
    }
    async stopRunningInstance(id: String) {
        return await this.httpService.post(`${url}/containers/${id}/start`)
            .toPromise()
            .then(res => res.status === 204 ? 'Container Stoppeds Successfully' : res.data.message)
            .catch(error => Error(error));
    }
}
