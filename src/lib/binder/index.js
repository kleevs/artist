(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../observable/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var index_1 = require("../observable/index");
    var BindManager = /** @class */ (function () {
        function BindManager(element, data) {
            if (data === void 0) { data = undefined; }
            this.element = element;
            this.data = data;
        }
        BindManager.prototype.manage = function (callback) {
            var _this = this;
            if (callback instanceof Array) {
                callback.forEach(function (c) { return _this.manage(c); });
            }
            else {
                var fn = callback(this.element, this.data);
                index_1.blind(function () { return index_1.observer(function () { return fn(); }); });
            }
        };
        return BindManager;
    }());
    exports.BindManager = BindManager;
});
