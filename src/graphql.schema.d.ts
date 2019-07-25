
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class ContainerId {
    id: string;
}

export class CreateNewContainer {
    requestedName: string;
    image: string;
    commands?: string[];
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
    Labels?: string;
    SizeRw?: number;
    SizeRootFs?: number;
    HostConfig?: HostConfig;
    NetworkSettings?: NetworkSettings;
    Mounts?: Mount[];
}

export class HostConfig {
    NetworkMode?: string;
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
    abstract createNewContainer(data?: CreateNewContainer): string | Promise<string>;
    abstract stopRunningContainer(data: ContainerId): string | Promise<string>;
    abstract startContainer(data: ContainerId): string | Promise<string>;
    abstract removeContainer(data: ContainerId): string | Promise<string>;
}

export class Networks {
    bridge?: Bridge;
}

export class NetworkSettings {
    Networks?: Networks;
}

export class Port {
    PrivatePort?: number;
    PublicPort?: number;
    Type?: string;
}

export abstract class IQuery {
    abstract allContainers(): Container[] | Promise<Container[]>;
    abstract allRunningContainers(): Container[] | Promise<Container[]>;
}
