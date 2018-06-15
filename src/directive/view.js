(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../lib/polyfills/promise", "../service/viewProvider", "../lib/dom/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    require("../lib/polyfills/promise");
    var viewProvider_1 = require("../service/viewProvider");
    var index_1 = require("../lib/dom/index");
    function view(valueAccessor, param) {
        var callback = param instanceof Function && param || param && param.callback;
        var beforeIn = param && param.beforeIn;
        var afterIn = param && param.afterIn;
        var beforeOut = param && param.beforeOut;
        var afterOut = param && param.afterOut;
        return function (element, serviceProvider) {
            element.innerHTML = "";
            return function () {
                var value = valueAccessor();
                var array = !value || value instanceof Array ? (value || []) : [value];
                var deleted = index_1.createElement("<div></div>");
                var added = index_1.createElement("<div></div>");
                var promises = array.map(function (item) { return serviceProvider.getService(viewProvider_1.IViewProvider).getNode(item); });
                Promise.all(promises)
                    .then(function (elts) {
                    element.childNodes.forEach(function (el) {
                        beforeOut && beforeOut(el);
                        deleted.appendChild(el);
                        afterOut && afterOut(el);
                        index_1.dispatchEvent(el, 'custom:view:dom:remove');
                    });
                    elts.forEach(function (el) {
                        beforeIn && beforeIn(el);
                        element.appendChild(el);
                        afterIn && afterIn(el);
                        index_1.dispatchEvent(el, 'custom:view:dom:added');
                    });
                    callback && callback(value);
                    return elts;
                });
            };
        };
    }
    exports.view = view;
});
