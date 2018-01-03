(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../dist/artist", "./layout/layout"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const artist_1 = require("../../dist/artist");
    const layout_1 = require("./layout/layout");
    artist_1.startup(class StartUp extends artist_1.IStartUp {
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