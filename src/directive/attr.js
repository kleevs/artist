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
    function attr(valueAccessor) {
        return (element) => {
            var $element = $(element);
            return () => {
                var value = valueAccessor();
                for (var key in value) {
                    if (value[key] === undefined) {
                        $element.removeAttr(key);
                    }
                    else {
                        $element.attr(key, value[key]);
                    }
                }
            };
        };
    }
    exports.attr = attr;
});
