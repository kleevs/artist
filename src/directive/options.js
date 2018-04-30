(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "node_modules/jquery/dist/jquery"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const $ = require("node_modules/jquery/dist/jquery");
    function options(valueAccessor) {
        return (element) => {
            var $element = $(element);
            $element.html("");
            return () => {
                var value = valueAccessor();
                $element.html("");
                $element.append(value.map((item) => {
                    var $opt = $("<option>");
                    $opt.val(item.id);
                    $opt.text(item.text);
                    return $opt;
                }));
                $element.val($element.data("value"));
            };
        };
    }
    exports.options = options;
});
