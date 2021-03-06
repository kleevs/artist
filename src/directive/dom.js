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
    function dom(option) {
        return function (element, serviceProvider) {
            var fns = [
                on_1.on('custom:view:dom:remove', function () { return function (e) {
                    if (e.target === e.currentTarget) {
                        option.out(e);
                        return true;
                    }
                    return false;
                }; })(element, serviceProvider),
                on_1.on('custom:view:dom:added', function () { return function (e) {
                    if (e.target === e.currentTarget) {
                        option.in(e);
                        return true;
                    }
                    return false;
                }; })(element, serviceProvider)
            ];
            return function () { return fns.map(function (fn) { return fn(); }); };
        };
    }
    exports.dom = dom;
});
