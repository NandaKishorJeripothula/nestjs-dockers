import { Injectable, HttpService } from '@nestjs/common';
import { Args, Info } from '@nestjs/graphql';
import { url } from '../config';
import {
  Message,
  Container,
  ContainerDetails,
  NewContainer,
} from '../graphql.schema';
import {
  CONFLICT,
  CONTAINER_STOPPED_ALREADY,
  BAD_PARAMETER,
  CONTAINER_KILLED,
  CONTAINER_NOT_AVAILABLE,
  CONTAINER_REMOVED,
  CONTAINER_NOT_RUNNING,
  CONTAINER_RESTARTED,
  CONTAINER_STARTED,
  CONTAINER_STARTED_ALREADY,
  CONTAINER_STOPPED,
  NO_RUNNING_CONTAINERS,
  STREAM_RESPONSE,
} from '../constants';
@Injectable()
export class DockerService {
  constructor(private readonly httpService: HttpService) {}

  /** Graphql Services */
  async getAllContainers(@Args() args, @Info() info): Promise<Container[]> {
    return await this.httpService
      .get(`${url}/containers/json?all=true`)
      .toPromise()
      .then(res =>
        res.status === 200 && res.data.length == 0
          ? { message: NO_RUNNING_CONTAINERS }
          : res.status === 200 && res.data.length > 0
          ? res.data
          : res.data.message,
      )
      .then(data => data)
      .catch(error => Error(error));
  }

  async allRunningContainers(@Args() args, @Info() info): Promise<Container[]> {
    return await this.httpService
      .get(`${url}/containers/json`)
      .toPromise()
      .then(res =>
        res.status === 200 && res.data.length === 0
          ? []
          : res.status === 200 && res.data.length > 0
          ? res.data
          : res.data.message,
      )
      .then(data => data)
      .catch(error => Error(error));
  }
  async createNewContainer(@Args() args, @Info() info): Promise<NewContainer> {
    let exposedPort = args.data.exposedPort + '/';
    // If no Protocol is defined default will be tcp
    exposedPort += args.data.protocol ? args.data.protocol : 'tcp';
    return await this.httpService
      .post(`${url}/containers/create?name=${args.data.requestedName}`, {
        // This is for dynamic binding with the host using TCP
        ExposedPorts: { [exposedPort]: {} },
        /**
         *  Input HostPort if a specific port is desired
         *  For best-practice, let the system decide the port since the desired may not be available
         */
        HostConfig: {
          PortBindings: { [exposedPort]: [{ HostPort: '' }] },
        },
        Image: args.data.image,
        Cmd: args.data.commands ? args.data.commands : [],
      })
      .toPromise()
      .then(res => {
        return res.status === 201 ? res.data : res.data.message;
      })
      .catch(error => Error(error));
  }
  async startContainer(@Args() args, @Info() info): Promise<Message> {
    return await this.httpService
      .post(`${url}/containers/${args.data.Id}/start`)
      .toPromise()
      .then(res =>
        res.status === 204 ? { message: CONTAINER_STARTED } : res.data,
      )
      .catch(error =>
        error.response.status === 304
          ? { message: CONTAINER_STARTED_ALREADY }
          : error.response.status === 404
          ? { message: CONTAINER_NOT_AVAILABLE }
          : Error(error),
      );
  }
  async stopContainer(@Args() args, @Info() info): Promise<Message> {
    return await this.httpService
      .post(`${url}/containers/${args.data.Id}/stop`)
      .toPromise()
      .then(res =>
        res.status === 204 ? { message: CONTAINER_STOPPED } : res.data,
      )
      .catch(error =>
        error.response.status === 304
          ? { message: CONTAINER_STOPPED_ALREADY }
          : error.response.status === 404
          ? { message: CONTAINER_NOT_AVAILABLE }
          : Error(error),
      );
  }
  async restartContainer(@Args() args, @Info() info): Promise<Message> {
    return await this.httpService
      .post(`${url}/containers/${args.data.Id}/restart`)
      .toPromise()
      .then(res =>
        res.status === 204 ? { message: CONTAINER_RESTARTED } : res.data,
      )
      .catch(error =>
        error.response.status === 404
          ? { message: CONTAINER_NOT_AVAILABLE }
          : Error(error),
      );
  }
  async killContainer(@Args() args, @Info() info): Promise<Message> {
    return await this.httpService
      .post(`${url}/containers/${args.data.Id}/kill`)
      .toPromise()
      .then(res =>
        res.status === 204 ? { message: CONTAINER_KILLED } : res.data,
      )
      .catch(error =>
        error.response.status === 404
          ? { message: CONTAINER_NOT_AVAILABLE }
          : error.response.status === 409
          ? { message: CONTAINER_NOT_RUNNING }
          : Error(error),
      );
  }
  async removeContainer(@Args() args, @Info() info): Promise<Message> {
    return await this.httpService
      .delete(`${url}/containers/${args.data.Id}`)
      .toPromise()
      .then(res =>
        res.status === 204 ? { message: CONTAINER_REMOVED } : res.data,
      )
      .catch(error =>
        error.response.status === 400
          ? { message: BAD_PARAMETER }
          : error.response.status === 404
          ? { message: CONTAINER_NOT_AVAILABLE }
          : error.response.status === 409
          ? {
              message: CONFLICT + error.response.data.message,
            }
          : Error(error),
      );
  }
  async getContainerLogs(@Args() args, @Info() info): Promise<Message> {
    let queryParams = '';
    for (let [key, value] of Object.entries(args.data.LogOptions)) {
      queryParams += `?${key}=${value}`;
    }
    return await this.httpService
      .get(`${url}/containers/${args.data.Container.Id}/logs${queryParams}`)
      .toPromise()
      .then(res =>
        res.status === 101
          ? { message: STREAM_RESPONSE }
          : res.status === 200
          ? { message: `Logs\n:${res.data}` }
          : res.data,
      )
      .catch(error =>
        error.response.status === 404
          ? { message: CONTAINER_NOT_AVAILABLE }
          : Error(error),
      );
  }
  async inspectContainer(
    @Args() args,
    @Info() info,
  ): Promise<ContainerDetails> {
    return await this.httpService
      .get(`${url}/containers/${args.data.Id}/json`)
      .toPromise()
      .then(res => res.data)
      .catch(error =>
        error.response.status === 404
          ? { message: CONTAINER_NOT_AVAILABLE }
          : Error(error),
      );
  }
}
