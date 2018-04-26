(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./service", "./view", "node_modules/amd-loader/src/index", "node_modules/jquery/dist/jquery", "node_modules/amd-loader/src/index", "node_modules/binder/src/index", "./view", "./service"], factory);
    }
})(function (require, exports) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    const service_1 = require("./service");
    const view_1 = require("./view");
    const index_1 = require("node_modules/amd-loader/src/index");
    const $ = require("node_modules/jquery/dist/jquery");
    var index_2 = require("node_modules/amd-loader/src/index");
    exports.load = index_2.load;
    __export(require("node_modules/binder/src/index"));
    var view_2 = require("./view");
    exports.View = view_2.View;
    exports.view = view_2.view;
    exports.dom = view_2.dom;
    exports.IViewProvider = view_2.IViewProvider;
    var service_2 = require("./service");
    exports.IServiceProvider = service_2.IServiceProvider;
    exports.INotifier = service_2.INotifier;
    exports.IObservablizer = service_2.IObservablizer;
    exports.Service = service_2.Service;
    exports.Event = service_2.Event;
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
        var viewProvider = service_1.serviceProvider.getService(view_1.IViewProvider);
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
