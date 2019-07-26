
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
    exposedPort: number;
    protocol?: string;
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

export interface Object {
    String?: string;
}

export class ArbitraryNameObject {
    ArbitraryName?: Object;
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
    Labels?: Object;
    SizeRw?: number;
    SizeRootFs?: number;
    HostConfig?: HostConfig;
    NetworkSettings?: NetworkSettings;
    Mounts?: Mount[];
}

export class ContainerAddressMessage {
    status?: number;
    message?: string;
    url?: string;
}

export class ContainerDetails {
    Id?: string;
    Created?: string;
    Path?: string;
    Args?: string[];
    State?: ContainerState;
    Image?: string;
    ResolvConfPath?: string;
    HostnamePath?: string;
    HostsPath?: string;
    LogPath?: string;
    Name?: string;
    RestartCount?: number;
    Driver?: string;
    Platform?: string;
    MountLabel?: string;
    ProcessLabel?: string;
    AppArmorProfile?: string;
    ExecIDs?: string;
    HostConfig?: ContainerHostConfig;
    GraphDriver?: GraphDriver;
    Mounts?: InspectContainerMount[];
    Config?: InspectContainerConfig;
    NetworkSettings?: InspectContainerNetworksettings;
}

export class ContainerHostConfig {
    Binds?: string;
    ContainerIDFile?: string;
    LogConfig?: LogConfig;
    NetworkMode?: string;
    PortBindings?: PortBindings;
    RestartPolicy?: RestartPolicy;
    AutoRemove?: boolean;
    VolumeDriver?: string;
    VolumesFrom?: string;
    CapAdd?: string;
    CapDrop?: string;
    Dns?: string;
    DnsOptions?: string;
    DnsSearch?: string;
    ExtraHosts?: string;
    GroupAdd?: string;
    IpcMode?: string;
    Cgroup?: string;
    Links?: string;
    OomScoreAdj?: number;
    PidMode?: string;
    Privileged?: boolean;
    PublishAllPorts?: boolean;
    ReadonlyRootfs?: boolean;
    SecurityOpt?: string;
    UTSMode?: string;
    UsernsMode?: string;
    ShmSize?: number;
    Runtime?: string;
    ConsoleSize?: number[];
    Isolation?: string;
    CpuShares?: number;
    Memory?: number;
    NanoCpus?: number;
    CgroupParent?: string;
    BlkioWeight?: number;
    BlkioWeightDevice?: string;
    BlkioDeviceReadBps?: string;
    BlkioDeviceWriteBps?: string;
    BlkioDeviceReadIOps?: string;
    BlkioDeviceWriteIOps?: string;
    CpuPeriod?: number;
    CpuQuota?: number;
    CpuRealtimePeriod?: number;
    CpuRealtimeRuntime?: number;
    CpusetCpus?: string;
    CpusetMems?: string;
    Devices?: string;
    DeviceCgroupRules?: string;
    DiskQuota?: number;
    KernelMemory?: number;
    MemoryReservation?: number;
    MemorySwap?: number;
    MemorySwappiness?: string;
    OomKillDisable?: boolean;
    PidsLimit?: number;
    Ulimits?: string;
    CpuCount?: number;
    CpuPercent?: number;
    IOMaximumIOps?: number;
    IOMaximumBandwidth?: number;
    MaskedPaths?: string[];
    ReadonlyPaths?: string[];
}

export class ContainerState {
    Status?: string;
    Running?: boolean;
    Paused?: boolean;
    Restarting?: boolean;
    OOMKilled?: boolean;
    Dead?: boolean;
    Pid?: number;
    ExitCode?: number;
    Error?: string;
    StartedAt?: string;
    FinishedAt?: string;
}

export class GraphDriver {
    Data?: GraphiDriverData;
    Name?: string;
}

export class GraphiDriverData {
    LowerDir?: string;
    MergedDir?: string;
    UpperDir?: string;
    WorkDir?: string;
}

export class HostConfig {
    NetworkMode?: string;
}

export class InspectContainerConfig {
    Hostname?: string;
    Domainname?: string;
    User?: string;
    AttachStdin?: boolean;
    AttachStdout?: boolean;
    AttachStderr?: boolean;
    ExposedPorts?: ArbitraryNameObject;
    Tty?: boolean;
    OpenStdin?: boolean;
    StdinOnce?: boolean;
    Env?: string[];
    Cmd?: string;
    ArgsEscaped?: boolean;
    Image?: string;
    Volumes?: ArbitraryNameObject;
    WorkingDir?: string;
    Entrypoint?: string[];
    OnBuild?: string;
    Labels?: Object;
}

export class InspectContainerMount {
    Type?: string;
    Name?: string;
    Source?: string;
    Destination?: string;
    Driver?: string;
    Mode?: string;
    RW?: boolean;
    Propagation?: string;
}

export class InspectContainerNetworks {
    bridge?: Object[];
}

export class InspectContainerNetworksettings {
    Bridge?: string;
    SandboxID?: string;
    HairpinMode?: boolean;
    LinkLocalIPv6Address?: string;
    LinkLocalIPv6PrefixLen?: number;
    Ports?: InspectContainerPorts;
    SandboxKey?: string;
    SecondaryIPAddresses?: string;
    SecondaryIPv6Addresses?: string;
    EndpointID?: string;
    Gateway?: string;
    GlobalIPv6Address?: string;
    GlobalIPv6PrefixLen?: number;
    IPAddress?: string;
    IPPrefixLen?: number;
    IPv6Gateway?: string;
    MacAddress?: string;
    Networks?: InspectContainerNetworks;
}

export class InspectContainerPorts {
    ArbitraryName?: string[];
}

export class Labels {
    ArbitraryName?: string;
}

export class LogConfig {
    Type?: string;
    Config?: string[];
}

export class Message {
    message?: string;
}

export class Mount {
    Name?: string;
    Source?: string;
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

export class PortBindings {
    Object?: Object;
}

export abstract class IQuery {
    abstract allContainers(): Container[] | Promise<Container[]>;
    abstract allRunningContainers(): Container[] | Promise<Container[]>;
    abstract getContainerLogs(data: Logs): Message | Promise<Message>;
    abstract inspectContainer(data: ContainerId): ContainerDetails | Promise<ContainerDetails>;
    abstract getContainerAddress(data: ContainerId): ContainerAddressMessage | Promise<ContainerAddressMessage>;
}

export class RestartPolicy {
    Name?: string;
    MaximumRetryCount?: number;
}

export type ArbitraryName = any;
