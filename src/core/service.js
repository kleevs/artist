(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../lib/dependency-injection/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const index_1 = require("../lib/dependency-injection/index");
    var injector = new index_1.DependencyInjector();
    exports.config = injector.getConfig();
    exports.serviceProvider = injector.getProvider();
    exports.Service = injector.getDecorator();
});
