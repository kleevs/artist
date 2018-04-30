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
    function change(valueAccessor) {
        return (element) => {
            $(element).change((e) => {
                return valueAccessor().call(element, e);
            });
            return () => { };
        };
    }
    exports.change = change;
});
