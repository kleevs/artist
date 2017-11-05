import { BindingHandler } from 'node_modules/binder/src/index';
import { AbstractBinder } from './binder';
export declare type ViewOption<TModel> = {
    selector?: string;
    template?: string;
    html?: string;
    binding?: {
        [s: string]: AbstractBinder<any, TModel>[];
    };
};
export declare function View<T>(options: ViewOption<T>): (constructor: new (...args: any[]) => T, metadata?: any) => void;
export declare class SubviewHandler<TModel> extends BindingHandler<{
    type: any;
    callback?: (view: any) => void;
}[], TModel> {
    private _binder;
    private _observable;
    constructor();
    init(element: any, valueAccessor: any, viewmodel: any, context: any): void;
    update(element: any, valueAccessor: any, viewmodel: any, context: any): void;
}
export declare function start<T>(el: HTMLElement, type: {
    prototype: T;
}, callback?: (view: T) => void): void;
