(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./startview", "./service", "./view", "./router", "./config", "node_modules/jquery/dist/jquery", "node_modules/binder/src/index", "node_modules/dependency-injection/src/index", "./view", "./router", "./service"], factory);
    }
})(function (require, exports) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    const startview_1 = require("./startview");
    const service_1 = require("./service");
    const view_1 = require("./view");
    const router_1 = require("./router");
    const config_1 = require("./config");
    const $ = require("node_modules/jquery/dist/jquery");
    __export(require("node_modules/binder/src/index"));
    __export(require("node_modules/dependency-injection/src/index"));
    __export(require("./view"));
    __export(require("./router"));
    __export(require("./service"));
    function startup(callback) {
        var context = window;
        var viewProvider = service_1.serviceProvider.getService(view_1.IViewProvider);
        var startview = viewProvider.newInstance(startview_1.StartView);
        var href = (href) => href.replace(location.origin, "");
        $("body").on("click", "a[href]", (event) => {
            service_1.serviceProvider.getService(router_1.IRouter)
                .onNext(href(event.currentTarget.href))
                .then(view => startview.renderView(view))
                .then((view) => service_1.serviceProvider.getService(router_1.IRouter).onLoaded(href(location.href), view));
            return false;
        });
        $("body").on("location:href", (event, data) => {
            service_1.serviceProvider.getService(router_1.IRouter)
                .onNext(href(data.href))
                .then(view => startview.renderView(view))
                .then((view) => service_1.serviceProvider.getService(router_1.IRouter).onLoaded(href(location.href), view) || view)
                .then((view) => data.resolve(view));
            return false;
        });
        window.onpopstate = (state) => {
            service_1.serviceProvider.getService(router_1.IRouter)
                .onBack(href(location.href))
                .then(view => startview.renderView(view))
                .then((view) => service_1.serviceProvider.getService(router_1.IRouter).onLoaded(href(location.href), view));
        };
        context.addEventListener("hashchange", () => {
            service_1.serviceProvider.getService(router_1.IRouter)
                .onNext(href(location.href))
                .then(view => startview.renderView(view))
                .then((view) => service_1.serviceProvider.getService(router_1.IRouter).onLoaded(href(location.href), view));
        }, false);
        callback(service_1.serviceProvider.getService(config_1.IConfig));
        service_1.serviceProvider.getService(router_1.IRouter)
            .onNext(href(location.href))
            .then(view => startview.renderView(view))
            .then((view) => service_1.serviceProvider.getService(router_1.IRouter).onLoaded(href(location.href), view));
        viewProvider.getNode(startview).then((el) => $(service_1.serviceProvider.getService(config_1.IConfig).container).append(el));
    }
    exports.startup = startup;
});
//# sourceMappingURL=index.js.map