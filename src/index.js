(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./service", "node_modules/observable/src/index", "node_modules/mvvm/src/index", "node_modules/dependency-injection/src/index", "./istartup", "./view", "./service"], factory);
    }
})(function (require, exports) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    const service_1 = require("./service");
    __export(require("node_modules/observable/src/index"));
    __export(require("node_modules/mvvm/src/index"));
    __export(require("node_modules/dependency-injection/src/index"));
    __export(require("./istartup"));
    __export(require("./view"));
    __export(require("./service"));
    function startup(starter) {
        var context = window;
        var startup = new starter();
        startup && startup.onStart && startup.onStart(service_1.config);
        startup && startup.onHashChange && context.addEventListener("hashchange", () => {
            startup.onHashChange(location.hash, location.href);
        }, false);
        startup && startup.onHashChange && startup.onHashChange(location.hash, location.href);
    }
    exports.startup = startup;
});
//# sourceMappingURL=index.js.map