export declare abstract class IConfigManager {
    abstract setConfig(config: any): any;
    abstract getConfig(): any;
}
export declare class ConfigManager extends IConfigManager {
    private _config;
    setConfig(config: any): void;
    getConfig(): any;
}
