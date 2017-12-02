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
    exports.foreach = foreach;
    function map(array, parse) {
        let res = [];
        foreach(array, (x) => { res.push(parse(x)); return false; });
        return res;
    }
    exports.map = map;
    function grep(array, predicate) {
        let i, res = [];
        for (i = 0; i < array.length; i++) {
            if (predicate(array[i], i))
                res.push(array[i]);
        }
        return res;
    }
    exports.grep = grep;
});
//# sourceMappingURL=mixin.js.map