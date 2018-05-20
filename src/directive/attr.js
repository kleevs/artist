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
    function attr(valueAccessor) {
        return function (element) {
            return function () {
                var value = valueAccessor();
                for (var key in value) {
                    if (value[key] === undefined) {
                        element.removeAttribute(key);
                    }
                    else {
                        element.setAttribute(key, value[key]);
                    }
                }
            };
        };
    }
    exports.attr = attr;
});
