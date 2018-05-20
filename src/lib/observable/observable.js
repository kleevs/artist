(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./core"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var core_1 = require("./core");
    function create(value) {
        var result = value;
        var obj = core_1.observable(function () { return result; });
        return function (value) {
            arguments.length > 0 && (result = value);
            obj.apply(this);
            return result;
        };
    }
    exports.create = create;
});
