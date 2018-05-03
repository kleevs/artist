import { serviceProvider } from './service';
import { IViewProvider } from '../service/viewProvider';
import { load, config, define } from 'node_modules/amd-loader/src/index';
import * as $ from 'node_modules/jquery/dist/jquery';

declare let __META__: any;

export { load } from 'node_modules/amd-loader/src/index';
export { View, Binder } from './view';
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

/** @description Startup du framework pour lancer l'application.  
 * @param {selector} string Sélecteur css pour cibler l'élément du DOM root de l'application. 
 * @param {view} class Vue qui sera instanciée en tant que vue root de l'application.  
 * @return
 */  
export function startup(selector, view) {
    var observer = new MutationObserver((records) => {
        records.forEach(record => { 
            var $removedNodes = $(record.removedNodes);
            var $addedNodes = $(record.addedNodes);
            var $removeViews = $(Array.prototype.map.call($removedNodes.filter("[artist-view=true][loaded]"), x => x).concat(
                Array.prototype.map.call($removedNodes.find("[artist-view=true][loaded]"), x => x)
            ));

            var $addedViews = $(Array.prototype.map.call($addedNodes.filter("[artist-view=true]:not([loaded])"), x => x).concat(
                Array.prototype.map.call($addedNodes.find("[artist-view=true]:not([loaded])"), x => x)
            ));

            $addedViews.attr("loaded", true);
            $removeViews.removeAttr("loaded");

            $removeViews.trigger("custom:view:dom:remove"); 
            $addedViews.trigger("custom:view:dom:added");
        });
    });

    observer.observe($("body")[0], { childList: true, subtree: true });
	var viewProvider = serviceProvider.getService(IViewProvider);
    viewProvider.getNode(viewProvider.newInstance(view)).then((el) => $(selector).append(el));
}

if (typeof __META__ === "undefined" || __META__.MODE !== "AMD") {
    var scripts = document.getElementsByTagName('script');
    var script = scripts[scripts.length-1];
    var configFileName = script.getAttribute("config");
    var mainFileName = script.getAttribute("startup");
    var placeHolder = script.getAttribute("placeholder");
    define(script.src, [], () => { return exports; })();
    placeHolder && (
        (configFileName && load(configFileName).then((conf: any) => config(conf && conf.default || {})) || Promise.resolve())
            .then(() => (mainFileName && load(mainFileName) || Promise.resolve(null)).then(modules => {
                var clss = modules && modules[Object.keys(modules).filter(_ => _.indexOf("_") !== 0)[0]];
                clss && startup(placeHolder, clss);
            }))
    );
}