import { Service } from '../core/service';

export abstract class IConfigManager {
    abstract setConfig(config: any);
    abstract getConfig(): any;
}

@Service({
    key: IConfigManager
})
export class ConfigManager extends IConfigManager {
    private _config;

    setConfig(config: any) {
        this._config = config;
    }

    getConfig(): any {
        return this._config;
    }
}