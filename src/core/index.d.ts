export { load } from '../lib/amd-loader/index';
export { View, Binder, ViewOption } from './view';
export { Service } from './service';
export { IServiceProvider, ServiceProvider } from '../service/serviceProvider';
export { INotifier, Notifier, Event } from '../service/notifier';
export { IViewProvider, ViewProvider } from '../service/viewProvider';
export { IObservablizer, Observablizer } from '../service/observalizer';
export { IModuleProvider, ModuleProvider } from '../service/moduleProvider';
export { IRouter, Router } from '../service/router';
export { IAjax, Ajax } from '../service/ajax';
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
export * from '../directive/router';
/** @description Startup du framework pour lancer l'application.
 * @param {selector} string Sélecteur css pour cibler l'élément du DOM root de l'application.
 * @param {view} class Vue qui sera instanciée en tant que vue root de l'application.
 * @return
 */
export declare function startup(selector: string, view: any): void;
