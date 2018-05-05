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
    function createElement(html) {
        html = html.trim();
        var isTr = html.match(/^<tr/);
        var isTd = html.match(/^<td/);
        var parser = document.createElement("div");
        if (isTr || isTd) {
            var table = document.createElement("table");
            parser = document.createElement("tbody");
            table.appendChild(parser);
            if (isTd) {
                var parent = parser;
                parser.appendChild(parser = document.createElement("tr"));
            }
        }
        parser.innerHTML = html;
        return parser.firstChild;
    }
    exports.createElement = createElement;
    ;
});
