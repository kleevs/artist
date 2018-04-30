import { IServiceProvider } from "../core/service";
export declare abstract class IViewProvider {
    abstract newInstance<T>(type: Function & {
        prototype: T;
    }): T;
    abstract newInstance<T>(type: Function & {
        prototype: T;
    }, arg: any): T;
    abstract map<T>(type: Function & {
        prototype: T;
    }): (arg: any) => T;
    abstract getNode(view: any): Promise<Element>;
    abstract getView(element: Element): any;
}
export declare class ViewProvider {
    private _serviceProvider;
    constructor(_serviceProvider: IServiceProvider);
    newInstance<T>(type: Function & {
        prototype: T;
    }): T;
    newInstance<T>(type: Function & {
        prototype: T;
    }, arg: any): T;
    map<T>(type: Function & {
        prototype: T;
    }): (arg: any) => T;
    getNode(view: any): Promise<Element>;
    getView(element: Element): any;
}
