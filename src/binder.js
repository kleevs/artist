(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "node_modules/binder/src/index", "node_modules/binder/src/index", "./view"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const binder = require("node_modules/binder/src/index");
    const index_1 = require("node_modules/binder/src/index");
    exports.BindingHandler = index_1.BindingHandler;
    const view_1 = require("./view");
    class AbstractBinder extends index_1.Binder {
        constructor(handler, valueAccessor) {
            super(handler, valueAccessor);
        }
    }
    exports.AbstractBinder = AbstractBinder;
    class Attr extends AbstractBinder {
        constructor(valueAccessor) {
            super(binder.Attr, valueAccessor);
        }
    }
    exports.Attr = Attr;
    class Change extends AbstractBinder {
        constructor(valueAccessor) {
            super(binder.Change, valueAccessor);
        }
    }
    exports.Change = Change;
    class Click extends AbstractBinder {
        constructor(valueAccessor) {
            super(binder.Click, valueAccessor);
        }
    }
    exports.Click = Click;
    class ForEach extends AbstractBinder {
        constructor(valueAccessor) {
            super(binder.ForEach, valueAccessor);
        }
    }
    exports.ForEach = ForEach;
    class Htmls extends AbstractBinder {
        constructor(valueAccessor) {
            super(binder.Htmls, valueAccessor);
        }
    }
    exports.Htmls = Htmls;
    class Options extends AbstractBinder {
        constructor(valueAccessor) {
            super(binder.Options, valueAccessor);
        }
    }
    exports.Options = Options;
    class Text extends AbstractBinder {
        constructor(valueAccessor) {
            super(binder.Text, valueAccessor);
        }
    }
    exports.Text = Text;
    class Value extends AbstractBinder {
        constructor(valueAccessor) {
            super(binder.Value, valueAccessor);
        }
    }
    exports.Value = Value;
    class Subview extends AbstractBinder {
        constructor(valueAccessor) {
            super(view_1.SubviewHandler, valueAccessor);
        }
    }
    exports.Subview = Subview;
});
//# sourceMappingURL=binder.js.map