import { Injectable, HttpService } from '@nestjs/common';
import { identifier } from '@babel/types';
const url = "http://localhost:2375";
@Injectable()
export class DockerService {

    constructor(private readonly httpService: HttpService) { }
    async getRunningInstances(): Promise<any> {
        return await this.httpService.get(`${url}/containers/json`)
            .toPromise()
            .then(res => res.data)
            .then(data => data)
            .catch(error => Error(error));
    }
    async getAllRunningInstances(): Promise<any> {
        return await this.httpService.get(`${url}/containers/json?all=true`)
            .toPromise()
            .then(res => res.data)
            .then(data=>data)
            .catch(error => Error(error));
    }
    // async getRunningInstances():
}
