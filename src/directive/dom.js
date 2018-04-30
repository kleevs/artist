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
    function dom(option) {
        return (element, serviceProvider) => {
            var $element = $(element);
            $element.on('custom:view:dom:remove', (e) => {
                if (e.target === e.currentTarget) {
                    option.out(e);
                }
            });
            $element.on('custom:view:dom:added', (e) => {
                if (e.target === e.currentTarget) {
                    option.in(e);
                }
            });
            return () => { };
        };
    }
    exports.dom = dom;
});
