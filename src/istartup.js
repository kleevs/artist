(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "node_modules/jquery/dist/jquery", "./view"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const $ = require("node_modules/jquery/dist/jquery");
    const view_1 = require("./view");
    class IStartUp {
        renderView(selector, view, callback) {
            view_1.start($(selector)[0], view, callback);
        }
    }
    exports.IStartUp = IStartUp;
});
//# sourceMappingURL=istartup.js.map