export declare abstract class IConfig {
    container: string;
    route(hash: string): Promise<{}>;
    loaded(hash: string, view: any): void;
}
export declare class Config extends IConfig {
    constructor();
}
