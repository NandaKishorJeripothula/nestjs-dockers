import { Injectable, HttpService } from '@nestjs/common';
import { Args, Info } from '@nestjs/graphql';
const address = "http://localhost:2375";
const ver = ""; // currently its v1.40 May be this is needed in production level add as /v1.40 
const url = address + ver;

import {Message,Container, ContainerDetails, NewContainer} from '../graphql.schema'
@Injectable()
export class DockerService {
    constructor(private readonly httpService: HttpService) { }

    /** Graphql Services */
    async getAllContainers(@Args() args, @Info() info): Promise<Container[]> {
        return await this.httpService.get(`${url}/containers/json?all=true`)
            .toPromise()
            .then(
                res => res.status === 200 && res.data.length == 0 ? { "Message": 'No Running Containers' }
                    : res.status === 200 && res.data.length > 0 ? res.data : res.data.message)
            .then(data => data)
            .catch(error => Error(error));
    }

    async allRunningContainers(@Args() args, @Info() info): Promise<Container[]> {
        return await this.httpService.get(`${url}/containers/json`)
            .toPromise()
            .then(
                res => res.status === 200 && res.data.length == 0 ? []
                    : res.status === 200 && res.data.length > 0 ? res.data : res.data.message)
            .then(data => data)
            .catch(error => Error(error));
    }
    async createNewContainer(@Args() args, @Info() info): Promise<NewContainer> {
        let exposedPort = args.data.exposedPort + "/";
        //If no Protocol is defined default will be tcp
        exposedPort += args.data.protocol ? args.data.protocol : 'tcp';
        return await this.httpService.post(
            `${url}/containers/create?name=${args.data.requestedName}`,
            {
                //This is for dynamic binding with the host using TCP
                ExposedPorts: { [exposedPort]: {} },
                /**
                 *  Input HostPort if a specific port is desired
                 *  For best-practice, let the system decide the port since the desired may not be available 
                 */
                HostConfig: {
                    PortBindings: { [exposedPort]: [{ HostPort: "" }] }
                },
                Image: args.data.image,
                Cmd: args.data.commands ? args.data.commands : []
            }
        )
            .toPromise()
            .then(res => {
                return res.status === 201 ? res.data : res.data.message
            })
            /**
             * error.response.status === 400 ? { message: "Bad Parameters" }
                : error.response.status === 404 ? { message: "No Such Container" }
                    : error.response.status === 409 ? { message: "Conflict" } : 
             */
            .catch(error => Error(error));
    }
    async startContainer(@Args() args, @Info() info): Promise<Message> {
        return await this.httpService.post(`${url}/containers/${args.data.Id}/start`)
            .toPromise()
            .then(res => res.status === 204 ? { message: "Container Started Successfully" } : res.data)
            .catch(error => error.response.status === 304 ? { message: "Container Already Started" }
                : error.response.status === 404 ? { message: "No Such Container" } : Error(error));
    }
    async stopContainer(@Args() args, @Info() info): Promise<Message> {
        return await this.httpService.post(`${url}/containers/${args.data.Id}/stop`)
            .toPromise()
            .then(res => res.status === 204 ? { message: "Container stopped Successfully" } : res.data)
            .catch(error => error.response.status === 304 ? { message: "Container Already Stopped" }
                : error.response.status === 404 ? { message: "No Such Container" } : Error(error));
    }
    async restartContainer(@Args() args, @Info() info): Promise<Message> {
        return await this.httpService.post(`${url}/containers/${args.data.Id}/restart`)
            .toPromise()
            .then(res => res.status === 204 ? { message: "Container Restarted Successfully" } : res.data)
            .catch(error => error.response.status === 404 ? { message: "No Such Container" } : Error(error));
    }
    async killContainer(@Args() args, @Info() info): Promise<Message> {
        return await this.httpService.post(`${url}/containers/${args.data.Id}/kill`)
            .toPromise()
            .then(res => res.status === 204 ? { message: "Container Killed" } : res.data)
            .catch(error => error.response.status === 404 ? { message: "No Such Container" }
                : error.response.status === 409 ? { message: "container is not running" } : Error(error));
    }
    async removeContainer(@Args() args, @Info() info): Promise<Message> {
        return await this.httpService.delete(`${url}/containers/${args.data.Id}`)
            .toPromise()
            .then(res => res.status === 204 ? { message: "Container Removed" } : res.data)
            .catch(error => error.response.status === 400 ? { message: "Bad Parameter" }
                : error.response.status === 404 ? { message: "No Such Container" }
                    : error.response.status === 409 ? { message: "Conflict Raised While Removing\n " + error.response.data.message }
                        : Error(error));
    }
    async getContainerLogs(@Args() args, @Info() info): Promise<Message> {
        let queryParams = '';
        for (let [key, value] of Object.entries(args.data.LogOptions)) {
            queryParams += (`?${key}=${value}`)
        }
        return await this.httpService.get(`${url}/containers/${args.data.Container.Id}/logs${queryParams}`)
            .toPromise()
            .then(res => res.status === 101 ? { message: "Logs Being Returned as Stream" }
                : res.status === 200 ? { message: `Logs\n:${res.data}` } : res.data)
            .catch(error => error.response.status === 404 ? { message: "No Such Container" } : Error(error));
    }
    async inspectContainer(@Args() args, @Info() info): Promise<ContainerDetails> {
        return await this.httpService.get(`${url}/containers/${args.data.Id}/json`)
            .toPromise()
            .then(res => res.data)
            .catch(error => error.response.status === 404 ? { message: "No Such Container" } : Error(error));
    }

}
