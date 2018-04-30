(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./observable", "./observer", "./blind"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var observable_1 = require("./observable");
    exports.observable = observable_1.create;
    var observer_1 = require("./observer");
    exports.observer = observer_1.create;
    var blind_1 = require("./blind");
    exports.blind = blind_1.create;
});
