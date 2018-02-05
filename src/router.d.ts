import { IConfig } from './config';
export declare abstract class IRouter {
    abstract goTo(href: string): Promise<any>;
    abstract onNext(href: any): Promise<any>;
    abstract onBack(href: any): Promise<any>;
    abstract onLoaded(href: any, view: any): void;
}
export declare class Router extends IRouter {
    private _config;
    private readonly cache;
    constructor(_config: IConfig);
    onLoad(href: string): Promise<any>;
    goTo(href: string): Promise<any>;
    onNext(href: string): Promise<any>;
    onBack(href: string): Promise<any>;
    onLoaded(href: any, view: any): void;
}
