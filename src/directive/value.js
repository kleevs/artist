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
    var on_1 = require("on");
    function value(options) {
        return [
            on_1.on(options.on || 'input', function () { return function (e) {
                var target = e.currentTarget;
                var value = target.value;
                if (target.type == "checkbox") {
                    value = target.checked;
                }
                options.set(value);
                return true;
            }; }),
            function (element) { return function () {
                var value = options.get();
                if (element.type == "checkbox") {
                    element.checked = value;
                }
                else {
                    element.value = value || '';
                }
            }; }
        ];
    }
    exports.value = value;
});
