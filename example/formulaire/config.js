(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let conf = {
        path: [
            { test: /^\/?jquery/, result: "/node_modules/jquery/dist/jquery" },
            { test: /^\/?(node_modules\/*)/, result: "/$1" },
            { test: /^\/?artist/, result: "/dist/artist" },
        ]
    };
    exports.default = conf;
    typeof AMDLoader !== "undefined" && AMDLoader && AMDLoader.config(conf);
});
//# sourceMappingURL=config.js.map