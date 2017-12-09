(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../src/index", "./layout/layout"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const index_1 = require("../../src/index");
    const layout_1 = require("./layout/layout");
    index_1.startup(class StartUp extends index_1.IStartUp {
        constructor() {
            super("[layout]");
        }
        onStart(config) {
            console.log("start");
            this.renderView(layout_1.ILayout, (layout) => {
                this._layout = layout;
            });
        }
        onHashChange(hash, href) {
            console.log("hash " + hash);
        }
    });
});
//# sourceMappingURL=config.js.map