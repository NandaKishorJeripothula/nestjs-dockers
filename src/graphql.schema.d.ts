
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class ContainerId {
    Id: string;
}

export class CreateNewContainer {
    requestedName: string;
    image: string;
    commands?: string[];
}

export class LogOptions {
    stdout?: boolean;
    stderr?: boolean;
    since?: number;
    until?: number;
    timestamps?: number;
    tail?: number;
}

export class Logs {
    Container: ContainerId;
    LogOptions: LogOptions;
}

export class Bridge {
    NetworkID?: string;
    EndpointID?: string;
    Gateway?: string;
    IPAddress?: string;
    IPPrefixLen?: number;
    IPv6Gateway?: string;
    GlobalIPv6Address?: string;
    GlobalIPv6PrefixLen?: number;
    MacAddress?: string;
}

export class Container {
    Id: string;
    Names?: string[];
    Image?: string;
    ImageID?: string;
    Command?: string;
    Created?: string;
    State?: string;
    Status?: string;
    Ports?: Port[];
    Labels?: Labels;
    SizeRw?: number;
    SizeRootFs?: number;
    HostConfig?: HostConfig;
    NetworkSettings?: NetworkSettings;
    Mounts?: Mount[];
}

export class HostConfig {
    NetworkMode?: string;
}

export class Labels {
    _any?: string;
}

export class Message {
    message?: string;
}

export class Mount {
    Name?: string;
    Sourc?: string;
    Destination?: string;
    Driver?: string;
    Mode?: string;
    RW?: boolean;
    Propagation?: string;
}

export abstract class IMutation {
    abstract createNewContainer(data: CreateNewContainer): NewContainer | Promise<NewContainer>;
    abstract startContainer(data: ContainerId): Message | Promise<Message>;
    abstract stopContainer(data: ContainerId): Message | Promise<Message>;
    abstract restartContainer(data: ContainerId): Message | Promise<Message>;
    abstract killContainer(data: ContainerId): Message | Promise<Message>;
    abstract removeContainer(data: ContainerId): Message | Promise<Message>;
}

export class Networks {
    bridge?: Bridge;
}

export class NetworkSettings {
    Networks?: Networks;
}

export class NewContainer {
    Id: string;
    Warnings?: string[];
}

export class Port {
    PrivatePort?: number;
    PublicPort?: number;
    Type?: string;
}

export abstract class IQuery {
    abstract allContainers(): Container[] | Promise<Container[]>;
    abstract allRunningContainers(): Container[] | Promise<Container[]>;
    abstract getContainerLogs(data: Logs): Message | Promise<Message>;
}
