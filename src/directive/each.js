(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "node_modules/jquery/dist/jquery", "../lib/binder/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const $ = require("node_modules/jquery/dist/jquery");
    const index_1 = require("../lib/binder/index");
    function foreach(item, callback) {
        let i;
        if (item instanceof Array) {
            for (i = 0; i < item.length; i++) {
                callback(item[i], i);
            }
        }
        else {
            for (i in item) {
                callback(item[i], i);
            }
        }
    }
    function each(valueAccessor) {
        return (element) => {
            var $element = $(element), template = $element.html();
            $element.html("");
            return () => {
                var value = valueAccessor();
                $element.html("");
                value.forEach((item) => {
                    var t = $(template);
                    foreach(item, (valueAccessor, selector) => {
                        (selector.trim() === "this" && t || t.find(selector)).each((i, el) => {
                            new index_1.Binder(el).bind(valueAccessor);
                        });
                    });
                    $element.append(t);
                });
            };
        };
    }
    exports.each = each;
});
