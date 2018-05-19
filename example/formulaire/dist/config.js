define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var conf = {
        path: [
            { test: /^\/?jquery/, result: "node_modules/jquery/dist/jquery" },
            { test: /^\/?(node_modules\/*)/, result: "$1" },
            { test: /^\/?(dist\/tmpl\/*)/, result: "$1" },
            { test: /^\/?artiste/, result: "node_modules/artistejs/dist/artiste" },
        ]
    };
    exports["default"] = conf;
});
