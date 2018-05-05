(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../service/viewProvider", "../lib/dom/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const viewProvider_1 = require("../service/viewProvider");
    const index_1 = require("../lib/dom/index");
    function view(valueAccessor, callback) {
        return (element, serviceProvider) => {
            element.innerHTML = "";
            return () => {
                var value = valueAccessor();
                var array = !value || value instanceof Array ? (value || []) : [value];
                var deleted = index_1.createElement("<div></div>");
                var added = index_1.createElement("<div></div>");
                var promises = array.map((item) => serviceProvider.getService(viewProvider_1.IViewProvider).getNode(item));
                Promise.all(promises)
                    .then((elts) => {
                    element.childNodes.forEach((el) => {
                        deleted.appendChild(el);
                    });
                    elts.forEach((el) => {
                        element.appendChild(el);
                    });
                    callback && callback(value);
                    return elts;
                });
            };
        };
    }
    exports.view = view;
});
