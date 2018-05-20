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
    function on(event, valueAccessor) {
        return function (element) {
            element.addEventListener(event, function (e) {
                var stopPropagation = valueAccessor().call(element, e);
                stopPropagation && e.stopPropagation();
            });
            return function () { };
        };
    }
    exports.on = on;
});
