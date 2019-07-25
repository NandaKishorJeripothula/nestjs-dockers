import { Injectable, HttpService } from '@nestjs/common';

import { Query, Resolver, Args, Info } from '@nestjs/graphql';

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
    async createNewContainerAPIS(requestedName: String, image: String, commands: String[]): Promise<String> {
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
        return await this.httpService.post(`${url}/containers/${id}/stop`)
            .toPromise()
            .then(res => res.status === 204 ? 'Container Stoppeds Successfully' : res.data.message)
            .catch(error => Error(error));
    }


    /** Graphql Services */
    async getAllContainers(@Args() args, @Info() info): Promise<any> {
        return await this.httpService.get(`${url}/containers/json?all=true`)
            .toPromise()
            .then(
                res => res.status === 200 && res.data.length == 0 ? { "Message": 'No Running Containers' }
                    : res.status === 200 && res.data.length > 0 ? res.data : res.data.message)
            .then(data => data)
            .catch(error => Error(error));
    }

    async allRunningContainers(@Args() args, @Info() info): Promise<any> {
        return await this.httpService.get(`${url}/containers/json`)
            .toPromise()
            .then(
                res => res.status === 200 && res.data.length == 0 ? []
                    : res.status === 200 && res.data.length > 0 ? res.data : res.data.message)
            .then(data => data)
            .catch(error => Error(error));
    }
    async createNewContainer(@Args() args, @Info() info): Promise<any> {
        return await this.httpService.post(
            `${url}/containers/create?name=${args.data.requestedName}`,
            {
                Image: args.data.image,
                Cmd: args.commands ? args.commands : []
            }
        )
            .toPromise()
            .then(res => {
                return res.status === 201 ? res.data : res.data.message
            })
            .catch(error => Error(error));
    }
    async startContainer(@Args() args, @Info() info): Promise<any> {
        return await this.httpService.post(`${url}/containers/${args.data.Id}/start`)
            .toPromise()
            .then(res => res.status === 204 ? { message: "Container Started Successfully" } : res.data)
            .catch(error => error.response.status === 304 ? { message: "Container Already Started" }
                : error.response.status === 404 ? { message: "No Such Container" } : Error(error));
    }
    async stopRunningContainer(@Args() args, @Info() info): Promise<any> {
        return await this.httpService.post(`${url}/containers/${args.data.Id}/stop`)
            .toPromise()
            .then(res => res.status === 204 ? { message: "Container stopped Successfully" } : res.data)
            .catch(error => error.response.status === 304 ? { message: "Container Already Stopped" }
                : error.response.status === 404 ? { message: "No Such Container" } : Error(error));
    }
    async restartContainer(@Args() args, @Info() info): Promise<any> {
        return await this.httpService.post(`${url}/containers/${args.data.Id}/restart`)
            .toPromise()
            .then(res => res.status === 204 ? { message: "Container Restarted Successfully" } : res.data)
            .catch(error => error.response.status === 404 ? { message: "No Such Container" } : Error(error));
    }
    async killContainer(@Args() args, @Info() info): Promise<any> {
        return await this.httpService.post(`${url}/containers/${args.data.Id}/kill`)
            .toPromise()
            .then(res => res.status === 204 ? { message: "Container Killed" } : res.data)
            .catch(error => error.response.status === 404 ? { message: "No Such Container" }
                : error.response.status === 409 ? { message: "container is not running" } : Error(error));
    }
    async removeContainer(@Args() args, @Info() info): Promise<any> {
        return await this.httpService.delete(`${url}/containers/${args.data.Id}`)
            .toPromise()
            .then(res => res.status === 204 ? { message: "Container Removed" } : res.data)
            .catch(error => error.response.status === 400 ? { message: "Bad Parameter" }
                : error.response.status === 404 ? { message: "No Such Container" }
                    : error.response.status === 409 ? { message: "Conflict Raised While Removing\n "+error.response.data.message }
                        : Error(error));
    }
    async getContainerLogs(@Args() args, @Info() info): Promise<any> {
        let queryParams='';
        for (let [key, value] of Object.entries(args.data.LogOptions)) {
            queryParams+=(`?${key}=${value}`)
        }
        // console.log(queryParams);
        return await this.httpService.get(`${url}/containers/${args.data.Container.Id}/logs${queryParams}`)
            .toPromise()
            .then(res => res.status === 101 ? { message: "Logs Being Returned as Stream" }
                : res.status === 200 ? { message: `Logs\n:${res.data}` } : res.data)
            .catch(error => error.response.status === 404 ? { message: "No Such Container" } : Error(error));
    }



}
