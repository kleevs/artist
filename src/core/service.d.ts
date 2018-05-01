import { IConfig, IProvider } from '../lib/dependency-injection/index';
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
