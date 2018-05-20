import { IConfigManager } from '../service/configManager';
export declare abstract class IRouter {
    abstract on(callback: (href: string, pathname: string, hash: string) => void): void;
    abstract trigger(href: string): void;
    abstract getUrl(localUri: string): string;
}
export declare class Router extends IRouter {
    private configManager;
    private _callbacks;
    constructor(configManager: IConfigManager);
    on(callback: (href: string, pathname: string, hash: string) => void): void;
    trigger(href: string): void;
    change(str: string): void;
    parse(href: string): HTMLAnchorElement;
    getUrl(localUri: string): string;
}
