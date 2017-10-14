import { IProvider, IConfig } from 'node_modules/dependency-injection/src/index';
export declare let config: IConfig;
export declare let provider: IProvider;
export declare let Service: <TKey, TValue extends TKey>(options: {
    interface: {
        prototype: TKey;
    };
}) => (target: new (...arg: any[]) => TValue) => void;
