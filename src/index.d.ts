export { load } from 'node_modules/amd-loader/src/index';
export * from 'node_modules/binder/src/index';
export { View, ViewOption, view, dom, IViewProvider } from './view';
export { IServiceProvider, INotifier, IObservablizer, Service, Event } from './service';
export declare function startup(selector: any, view: any): void;
