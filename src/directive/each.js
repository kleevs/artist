(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../core/view", "../lib/dom/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var view_1 = require("../core/view");
    var index_1 = require("../lib/dom/index");
    function foreach(item, callback) {
        var i;
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
        return function (element, serviceProvider) {
            var template = element.innerHTML;
            element.innerHTML = "";
            return function () {
                var value = valueAccessor();
                element.innerHTML = "";
                value.map(function (item) {
                    var t = index_1.createElement(template);
                    foreach(item, function (valueAccessor, selector) {
                        (selector.trim() === "this" && [t] || t.querySelectorAll(selector)).forEach(function (el, i) {
                            new view_1.BindManager(el, serviceProvider).manage(valueAccessor);
                        });
                    });
                    return t;
                }).forEach(function (el) { return element.appendChild(el); });
            };
        };
    }
    exports.each = each;
});
