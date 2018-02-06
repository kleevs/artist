(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./service", "./view", "node_modules/jquery/dist/jquery", "node_modules/binder/src/index", "node_modules/dependency-injection/src/index", "./view", "./service"], factory);
    }
})(function (require, exports) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    const service_1 = require("./service");
    const view_1 = require("./view");
    const $ = require("node_modules/jquery/dist/jquery");
    __export(require("node_modules/binder/src/index"));
    __export(require("node_modules/dependency-injection/src/index"));
    __export(require("./view"));
    __export(require("./service"));
    function startup(selector, view) {
        var viewProvider = service_1.serviceProvider.getService(view_1.IViewProvider);
        viewProvider.getNode(viewProvider.newInstance(view)).then((el) => $(selector).append(el));
    }
    exports.startup = startup;
});
//# sourceMappingURL=index.js.map