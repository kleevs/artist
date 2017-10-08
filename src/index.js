(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./istartup", "./view", "node_modules/dependency-injection/src/index", "node_modules/jquery/dist/jquery", "./istartup", "./view"], factory);
    }
})(function (require, exports) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    const istartup_1 = require("./istartup");
    const view_1 = require("./view");
    const index_1 = require("node_modules/dependency-injection/src/index");
    const $ = require("node_modules/jquery/dist/jquery");
    __export(require("./istartup"));
    __export(require("./view"));
    var injector = new index_1.DependencyInjector();
    var config = injector.getConfig();
    var provider = injector.getProvider();
    view_1.setServiceProvider(provider);
    $(() => {
        setTimeout(() => {
            var context = window;
            var startup = context && context.StartUp && context.StartUp.prototype instanceof istartup_1.IStartUp && new context.StartUp();
            startup && startup.onStart(config);
            startup && context.addEventListener("hashchange", () => {
                startup.onHashChange(location.hash, location.href);
            }, false);
            startup && startup.onHashChange(location.hash, location.href);
        });
    });
});
//# sourceMappingURL=index.js.map