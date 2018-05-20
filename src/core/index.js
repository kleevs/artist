(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./service", "../service/viewProvider", "../lib/amd-loader/index", "../service/configManager", "../lib/amd-loader/index", "./view", "./service", "../service/serviceProvider", "../service/notifier", "../service/viewProvider", "../service/observalizer", "../service/moduleProvider", "../service/router", "../service/ajax", "../service/configManager", "../directive/view", "../directive/dom", "../directive/attr", "../directive/change", "../directive/click", "../directive/text", "../directive/value", "../directive/options", "../directive/each", "../directive/class", "../directive/router"], factory);
    }
})(function (require, exports) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    const service_1 = require("./service");
    const viewProvider_1 = require("../service/viewProvider");
    const index_1 = require("../lib/amd-loader/index");
    const configManager_1 = require("../service/configManager");
    var index_2 = require("../lib/amd-loader/index");
    exports.load = index_2.load;
    var view_1 = require("./view");
    exports.View = view_1.View;
    var service_2 = require("./service");
    exports.Service = service_2.Service;
    var serviceProvider_1 = require("../service/serviceProvider");
    exports.IServiceProvider = serviceProvider_1.IServiceProvider;
    exports.ServiceProvider = serviceProvider_1.ServiceProvider;
    var notifier_1 = require("../service/notifier");
    exports.INotifier = notifier_1.INotifier;
    exports.Notifier = notifier_1.Notifier;
    exports.Event = notifier_1.Event;
    var viewProvider_2 = require("../service/viewProvider");
    exports.IViewProvider = viewProvider_2.IViewProvider;
    exports.ViewProvider = viewProvider_2.ViewProvider;
    var observalizer_1 = require("../service/observalizer");
    exports.IObservablizer = observalizer_1.IObservablizer;
    exports.Observablizer = observalizer_1.Observablizer;
    var moduleProvider_1 = require("../service/moduleProvider");
    exports.IModuleProvider = moduleProvider_1.IModuleProvider;
    exports.ModuleProvider = moduleProvider_1.ModuleProvider;
    var router_1 = require("../service/router");
    exports.IRouter = router_1.IRouter;
    exports.Router = router_1.Router;
    var ajax_1 = require("../service/ajax");
    exports.IAjax = ajax_1.IAjax;
    exports.Ajax = ajax_1.Ajax;
    var configManager_2 = require("../service/configManager");
    exports.IConfigManager = configManager_2.IConfigManager;
    exports.ConfigManager = configManager_2.ConfigManager;
    __export(require("../directive/view"));
    __export(require("../directive/dom"));
    __export(require("../directive/attr"));
    __export(require("../directive/change"));
    __export(require("../directive/click"));
    __export(require("../directive/text"));
    __export(require("../directive/value"));
    __export(require("../directive/options"));
    __export(require("../directive/each"));
    __export(require("../directive/class"));
    __export(require("../directive/router"));
    /** @description Startup du framework pour lancer l'application.
     * @param {selector} string Sélecteur css pour cibler l'élément du DOM root de l'application.
     * @param {view} class Vue qui sera instanciée en tant que vue root de l'application.
     * @return
     */
    function startup(selector, view) {
        var observer = new MutationObserver((records) => {
            records.forEach(record => {
                var removedNodes = Array.prototype.map.call(record.removedNodes, x => x);
                var addedNodes = Array.prototype.map.call(record.addedNodes, x => x);
                removedNodes.forEach(e => e.dispatchEvent(new Event("custom:view:dom:remove")));
                addedNodes.forEach(e => e.dispatchEvent(new Event("custom:view:dom:added")));
            });
        });
        observer.observe(document.querySelector("body"), { childList: true, subtree: true });
        var viewProvider = service_1.serviceProvider.getService(viewProvider_1.IViewProvider);
        viewProvider.getNode(viewProvider.newInstance(view)).then((el) => document.querySelector(selector).appendChild(el));
    }
    exports.startup = startup;
    if (typeof __META__ === "undefined" || __META__.MODE !== "AMD") {
        var scripts = document.getElementsByTagName('script');
        var script = scripts[scripts.length - 1];
        var configFileName = script.getAttribute("config");
        var mainFileName = script.getAttribute("startup");
        var placeHolder = script.getAttribute("placeholder");
        index_1.define(script.src, [], () => { return exports; })();
        placeHolder && ((configFileName && index_1.load(configFileName).then((conf) => {
            service_1.serviceProvider.getService(configManager_1.IConfigManager).setConfig(conf.default);
            index_1.config(conf && conf.default || {});
        }) || Promise.resolve())
            .then(() => (mainFileName && index_1.load(mainFileName) || Promise.resolve(null)).then(modules => {
            var clss = modules && modules[Object.keys(modules).filter(_ => _.indexOf("_") !== 0)[0]];
            clss && startup(placeHolder, clss);
        })));
    }
});
