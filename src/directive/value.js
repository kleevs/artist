(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "on"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const on_1 = require("on");
    function value(options) {
        return [
            on_1.on(options.on || 'input', () => (e) => options.set(e.currentTarget.value) || true),
            (element) => () => element.value = options.get() || ''
        ];
    }
    exports.value = value;
});
