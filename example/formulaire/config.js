(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../src/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const index_1 = require("../../src/index");
    window.StartUp = class StartUp extends index_1.IStartUp {
        constructor() {
            super();
            var context = window;
            this.require = context.require;
        }
        onStart(config) {
            console.log("start");
        }
        onHashChange(hash, href) {
            console.log("hash " + hash);
            this.require("./view/layout", (module) => {
                this.renderView("[layout]", module.ILayout);
            });
        }
    };
});
//# sourceMappingURL=config.js.map