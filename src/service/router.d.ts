export declare abstract class IRouter {
    abstract on(callback: (href: string) => void): void;
    abstract trigger(href: string): void;
}
export declare class Router extends IRouter {
    private _callbacks;
    constructor();
    on(callback: (href: string) => void): void;
    trigger(href: string): void;
    change(href: string): void;
}
