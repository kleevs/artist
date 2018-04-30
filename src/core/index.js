(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./service", "../service/viewProvider", "node_modules/amd-loader/src/index", "node_modules/jquery/dist/jquery", "node_modules/amd-loader/src/index", "./view", "./service", "../service/serviceProvider", "../service/notifier", "../service/viewProvider", "../service/observalizer", "../directive/view", "../directive/dom", "../directive/attr", "../directive/change", "../directive/click", "../directive/text", "../directive/value", "../directive/options", "../directive/each", "../directive/class"], factory);
    }
})(function (require, exports) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    const service_1 = require("./service");
    const viewProvider_1 = require("../service/viewProvider");
    const index_1 = require("node_modules/amd-loader/src/index");
    const $ = require("node_modules/jquery/dist/jquery");
    var index_2 = require("node_modules/amd-loader/src/index");
    exports.load = index_2.load;
    var view_1 = require("./view");
    exports.View = view_1.View;
    var service_2 = require("./service");
    exports.IServiceProvider = service_2.IServiceProvider;
    exports.IObservablizer = service_2.IObservablizer;
    exports.Service = service_2.Service;
    var serviceProvider_1 = require("../service/serviceProvider");
    exports.ServiceProvider = serviceProvider_1.ServiceProvider;
    var notifier_1 = require("../service/notifier");
    exports.INotifier = notifier_1.INotifier;
    exports.Notifier = notifier_1.Notifier;
    exports.Event = notifier_1.Event;
    var viewProvider_2 = require("../service/viewProvider");
    exports.IViewProvider = viewProvider_2.IViewProvider;
    exports.ViewProvider = viewProvider_2.ViewProvider;
    var observalizer_1 = require("../service/observalizer");
    exports.Observablizer = observalizer_1.Observablizer;
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
    function startup(selector, view) {
        var observer = new MutationObserver((records) => {
            records.forEach(record => {
                var $removedNodes = $(record.removedNodes);
                var $addedNodes = $(record.addedNodes);
                var $removeViews = $(Array.prototype.map.call($removedNodes.filter("[artist-view=true][loaded]"), x => x).concat(Array.prototype.map.call($removedNodes.find("[artist-view=true][loaded]"), x => x)));
                var $addedViews = $(Array.prototype.map.call($addedNodes.filter("[artist-view=true]:not([loaded])"), x => x).concat(Array.prototype.map.call($addedNodes.find("[artist-view=true]:not([loaded])"), x => x)));
                $addedViews.attr("loaded", true);
                $removeViews.removeAttr("loaded");
                $removeViews.trigger("custom:view:dom:remove");
                $addedViews.trigger("custom:view:dom:added");
            });
        });
        observer.observe($("body")[0], { childList: true, subtree: true });
        var viewProvider = service_1.serviceProvider.getService(viewProvider_1.IViewProvider);
        viewProvider.getNode(viewProvider.newInstance(view)).then((el) => $(selector).append(el));
    }
    exports.startup = startup;
    if (typeof __META__ === "undefined" || __META__.MODE !== "AMD") {
        var scripts = document.getElementsByTagName('script');
        var script = scripts[scripts.length - 1];
        var configFileName = script.getAttribute("config");
        var mainFileName = script.getAttribute("startup");
        var placeHolder = script.getAttribute("placeholder");
        index_1.define(script.src, [], () => { return exports; })();
        placeHolder && ((configFileName && index_1.load(configFileName).then((conf) => index_1.config(conf && conf.default || {})) || Promise.resolve())
            .then(() => (mainFileName && index_1.load(mainFileName) || Promise.resolve(null)).then(modules => {
            var clss = modules && modules[Object.keys(modules).filter(_ => _.indexOf("_") !== 0)[0]];
            clss && startup(placeHolder, clss);
        })));
    }
});
