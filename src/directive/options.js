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
    var index_1 = require("../lib/dom/index");
    function options(valueAccessor) {
        return function (element) {
            element.innerHTML = "";
            return function () {
                var value = valueAccessor();
                element.innerHTML = "";
                value.map(function (item) {
                    var opt = index_1.createElement("<option></option>");
                    opt.value = item.id;
                    opt.textContent = item.text;
                    return opt;
                }).forEach(function (o) { return element.appendChild(o); });
            };
        };
    }
    exports.options = options;
});
