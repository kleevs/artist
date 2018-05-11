define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = {
        path: [
            { test: /^\/?(node_modules\/*)/, result: "$1" },
            { test: /^\/?artist/, result: "node_modules/artistejs/dist/artiste" }
        ]
    };
});
