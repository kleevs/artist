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
    const index_1 = require("../observable/index");
    class Binder {
        constructor(element, data = undefined) {
            this.element = element;
            this.data = data;
        }
        bind(callback) {
            var fn = callback(this.element, this.data, this);
            index_1.blind(() => index_1.observer(() => fn()));
        }
    }
    exports.Binder = Binder;
});
