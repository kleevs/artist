(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../service/router"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var router_1 = require("../service/router");
    function router() {
        return function (element, serviceProvider) {
            document.body.addEventListener("click", function (e) {
                var target = e.target;
                if (target.tagName.toLowerCase() === 'a') {
                    var href = target.pathname;
                    serviceProvider.getService(router_1.IRouter).trigger(href);
                    e.preventDefault();
                    return false;
                }
            });
            return function () {
            };
        };
    }
    exports.router = router;
});
