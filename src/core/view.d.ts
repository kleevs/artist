import { IServiceProvider } from '../service/serviceProvider';
export declare type ViewOption<TModel> = {
    selector?: string;
    template?: string;
    html?: string;
    binding?: {
        [s: string]: (model: TModel) => ((element, serviceProvider?: IServiceProvider) => () => any) | ((element, serviceProvider?: IServiceProvider) => () => any)[];
    };
};
export declare type RegisteredView<TModel> = {
    construct: {
        new (...args: any[]): any;
    };
    binding: {
        [s: string]: (model: TModel) => ((element, serviceProvider?: IServiceProvider) => () => any) | ((element, serviceProvider?: IServiceProvider) => () => any)[];
    };
    html: Promise<string>;
};
export declare let registeredView: RegisteredView<any>[];
export declare function View<T>(options: ViewOption<T>): (constructor: Function, metadata?: any) => void;
