(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../lib/dom/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const index_1 = require("../lib/dom/index");
    function options(valueAccessor) {
        return (element) => {
            element.innerHTML = "";
            return () => {
                var value = valueAccessor();
                element.innerHTML = "";
                value.map((item) => {
                    var opt = index_1.createElement("<option></option>");
                    opt.value = item.id;
                    opt.textContent = item.text;
                    return opt;
                }).forEach(o => element.appendChild(o));
            };
        };
    }
    exports.options = options;
});
