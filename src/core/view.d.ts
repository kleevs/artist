import { Binder as BBinder, BindManager as BBindManager } from '../lib/binder/index';
import { IServiceProvider } from '../service/serviceProvider';
export declare type Binder = BBinder<IServiceProvider>;
export declare class BindManager extends BBindManager<IServiceProvider> {
}
export declare type ViewOption<TModel> = {
    selector?: string;
    template?: string;
    html?: string;
    binding?: {
        [s: string]: (model: TModel) => Binder | Binder[];
    };
};
export declare type RegisteredView<TModel> = {
    construct: {
        new (...args: any[]): any;
    };
    binding: {
        [s: string]: (model: TModel) => Binder | Binder[];
    };
    html: Promise<string>;
};
export declare let registeredView: RegisteredView<any>[];
export declare function View<T>(options: ViewOption<T>): (constructor: Function, metadata?: any) => void;
