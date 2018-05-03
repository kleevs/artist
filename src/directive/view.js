(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "node_modules/jquery/dist/jquery", "../service/viewProvider"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const $ = require("node_modules/jquery/dist/jquery");
    const viewProvider_1 = require("../service/viewProvider");
    function view(valueAccessor, callback) {
        return (element, serviceProvider) => {
            var $element = $(element);
            $element.html("");
            return () => {
                var value = valueAccessor();
                var array = !value || value instanceof Array ? (value || []) : [value];
                var $deleted = $("<div>");
                var $added = $("<div>");
                Promise.all(array.map((item) => serviceProvider.getService(viewProvider_1.IViewProvider).getNode(item)))
                    .then((elts) => {
                    $element.children().each((i, el) => {
                        $(el).appendTo($deleted);
                    });
                    elts.forEach((el) => {
                        $element.append(el);
                    });
                    callback && callback(value);
                    return elts;
                });
            };
        };
    }
    exports.view = view;
});
