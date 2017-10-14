(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "node_modules/dependency-injection/src/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const index_1 = require("node_modules/dependency-injection/src/index");
    var injector = new index_1.DependencyInjector();
    exports.config = injector.getConfig();
    exports.provider = injector.getProvider();
    exports.Service = injector.getDecorator();
});
//# sourceMappingURL=service.js.map