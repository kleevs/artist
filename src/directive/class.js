(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function addClass(element, className) {
        var arr = element.className.split(" ");
        if (arr.indexOf(className) == -1) {
            element.className += " " + className;
        }
    }
    function removeClass(element, className) {
        var arr = element.className.split(" ");
        arr = arr.filter(function (name) { return name !== className; });
        element.className = arr.join(' ');
    }
    function classes(valueAccessor) {
        return function (element) {
            return function () {
                var value = valueAccessor();
                for (var key in value) {
                    if (value[key]) {
                        addClass(element, key);
                    }
                    else {
                        removeClass(element, key);
                    }
                }
            };
        };
    }
    exports.classes = classes;
});
