import { IProvider, IConfig } from 'node_modules/dependency-injection/src/index';
export declare let config: IConfig;
export declare let serviceProvider: IProvider;
export declare let Service: <TKey, TValue extends TKey>(options: {
    key: {
        prototype: TKey;
    };
    registerable?: boolean;
    initialize?: (instance: TKey) => void;
    test?: (serviceClass: any) => boolean;
}) => (target: new (...arg: any[]) => TValue) => void;
export declare abstract class IServiceProvider {
    abstract getService<T>(type: Function & {
        prototype: T;
    }): T;
}
export declare abstract class IObservablizer {
    abstract convert<T>(value: T & {}): T;
}
export declare abstract class INotifier {
    abstract forEvent<TContext, TArgument>(event: Event<TContext, TArgument>): {
        listen: (context: TContext, callback: (data: TArgument) => void) => void;
        notify: (context: TContext, data?: TArgument) => void;
    };
}
export declare class Event<TContext = void, TArgument = void> {
    key: string;
    constructor(key: string);
}
