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
    class Cache {
        constructor() {
            this.cache = {};
        }
        promise(key, func) {
            return new Promise((resolve, reject) => {
                var me = this, reslv = function () {
                    me.cache[key] = arguments[0];
                    resolve.apply(this, arguments);
                };
                this.cache[key] ? resolve(this.cache[key]) : func(reslv, reject);
            });
        }
    }
    exports.Cache = Cache;
});
//# sourceMappingURL=cache.js.map