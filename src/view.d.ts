import { BindingHandler } from 'node_modules/mvvm/src/index';
import { IProvider } from 'node_modules/dependency-injection/src/index';
export * from 'node_modules/mvvm/src/index';
export declare type ViewOption<TModel> = {
    selector?: string;
    template?: string;
    html?: string;
    binding?: {
        [s: string]: BindingHandler<any, TModel>[];
    };
};
export declare function View<T>(options: ViewOption<T>): (constructor: new (...args: any[]) => T) => void;
export declare class Subview<TModel> extends BindingHandler<{
    type: any;
    constructor?: (view: any) => void;
}[], TModel> {
    constructor(valueAccessor: (ctx) => {
        type: any;
        constructor?: (view: any) => void;
    }[]);
    update(element: HTMLElement, allBinding: any, viewmodel: any, context: any): void;
}
export declare function start<T>(el: HTMLElement, type: {
    prototype: T;
}, callback?: (view: T) => void): void;
export declare function setServiceProvider(value: IProvider): void;
