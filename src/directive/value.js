(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "node_modules/jquery/dist/jquery"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const $ = require("node_modules/jquery/dist/jquery");
    function value(valueAccessor) {
        return (element) => {
            var $element = $(element);
            $element.on("input", () => {
                valueAccessor.set($element.val());
            });
            return () => {
                var value = valueAccessor.get();
                $element.val(value);
            };
        };
    }
    exports.value = value;
});
