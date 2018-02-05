import { IConfig } from './config';
export * from 'node_modules/binder/src/index';
export * from 'node_modules/dependency-injection/src/index';
export * from './view';
export * from './router';
export * from './service';
export declare function startup(callback: (config: IConfig) => void): void;
