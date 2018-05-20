import { serviceProvider } from './service';
import { IViewProvider } from '../service/viewProvider';
import { load, config, define } from '../lib/amd-loader/index';
import { IConfigManager } from '../service/configManager';

declare let exports;
declare let __META__: any;

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
export { IConfigManager, ConfigManager } from '../service/configManager';

export * from '../directive/view';
export * from '../directive/on';
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
export function startup(selector: string, view) {
    var observer = new MutationObserver((records) => {
        records.forEach(record => { 
            var removedNodes: Element[] = Array.prototype.map.call(record.removedNodes, x => x);
            var addedNodes: Element[] = Array.prototype.map.call(record.addedNodes, x => x);

            removedNodes.forEach(e => e.dispatchEvent(new Event("custom:view:dom:remove")));
            addedNodes.forEach(e => e.dispatchEvent(new Event("custom:view:dom:added")));
        });
    });

    observer.observe(document.querySelector("body"), { childList: true, subtree: true });
	var viewProvider = serviceProvider.getService(IViewProvider);
    viewProvider.getNode(viewProvider.newInstance(view)).then((el) => document.querySelector(selector).appendChild(el));
}

if (typeof __META__ === "undefined" || __META__.MODE !== "AMD") {
    var scripts = document.getElementsByTagName('script');
    var script = scripts[scripts.length-1];
    var configFileName = script.getAttribute("config");
    var mainFileName = script.getAttribute("startup");
    var placeHolder = script.getAttribute("placeholder");
    define(script.src, [], () => { return exports; })();
    placeHolder && (
        (configFileName && load(configFileName).then((conf: any) => { 
            serviceProvider.getService(IConfigManager).setConfig(conf.default);
            config(conf && conf.default || {}); 
        }) || Promise.resolve())
            .then(() => (mainFileName && load(mainFileName) || Promise.resolve(null)).then(modules => {
                var clss = modules && modules[Object.keys(modules).filter(_ => _.indexOf("_") !== 0)[0]];
                clss && startup(placeHolder, clss);
            }))
    );
}