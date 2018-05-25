import '../lib/polyfills/promise';
import { IConfigManager } from '../service/configManager';
export declare abstract class IAjax {
    abstract ajax<T>(options: {
        url: string;
        method?: string;
        data?: any;
        headers?: {
            [name: string]: string;
        };
    }): Promise<{
        result: T;
        status: string;
    }>;
}
export declare class Ajax extends IAjax {
    private configManager;
    constructor(configManager: IConfigManager);
    ajax<T>(options: any): Promise<{
        result: T;
        status: string;
    }>;
    getXMLHttpRequest(): any;
}
