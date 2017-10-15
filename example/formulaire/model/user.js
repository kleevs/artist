(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../../src/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const index_1 = require("../../../src/index");
    class User {
        constructor() {
            this.last = index_1.object();
            this.first = index_1.object();
            this.age = index_1.object();
        }
    }
    exports.User = User;
});
//# sourceMappingURL=user.js.map