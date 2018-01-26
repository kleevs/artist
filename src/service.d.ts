import { IProvider, IConfig } from 'node_modules/dependency-injection/src/index';
export declare let config: IConfig;
export declare let serviceProvider: IProvider;
export declare let Service: <TKey, TValue extends TKey>(options: {
    interface: {
        prototype: TKey;
    };
}) => (target: new (...arg: any[]) => TValue) => void;
export declare abstract class IObservablizer {
    abstract convert<T>(value: T & {}): T;
}
export declare abstract class INotifier {
    abstract notify(obj: any, key: string, data: any): void;
    abstract listen(obj: any, key: string, callback: (data) => void): void;
    abstract forEvent<TArgument>(event: {
        key: string;
        type: {
            prototype: TArgument;
        };
    }): {
        listen: (obj: any, callback: (data: TArgument) => void) => void;
        notify: (obj: any, value: TArgument) => void;
    };
}
