export { load } from 'node_modules/amd-loader/src/index';
export { View, ViewOption } from './view';
export { Service } from './service';
export { IServiceProvider, ServiceProvider } from '../service/serviceProvider';
export { INotifier, Notifier, Event } from '../service/notifier';
export { IViewProvider, ViewProvider } from '../service/viewProvider';
export { IObservablizer, Observablizer } from '../service/observalizer';
export * from '../directive/view';
export * from '../directive/dom';
export * from '../directive/attr';
export * from '../directive/change';
export * from '../directive/click';
export * from '../directive/text';
export * from '../directive/value';
export * from '../directive/options';
export * from '../directive/each';
export * from '../directive/class';
export declare function startup(selector: any, view: any): void;
