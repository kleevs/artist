export declare abstract class IRouter {
    abstract on(callback: (href: string, pathname: string, hash: string) => void): void;
    abstract trigger(href: string): void;
}
export declare class Router extends IRouter {
    private _callbacks;
    constructor();
    on(callback: (href: string, pathname: string, hash: string) => void): void;
    trigger(href: string): void;
    change(str: string): void;
    parse(href: string): HTMLAnchorElement;
}
