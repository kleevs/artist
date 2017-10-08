(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "node_modules/mixin/src/index", "node_modules/observable/src/index", "node_modules/mvvm/src/index", "node_modules/jquery/dist/jquery", "node_modules/mvvm/src/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    const index_1 = require("node_modules/mixin/src/index");
    const index_2 = require("node_modules/observable/src/index");
    const index_3 = require("node_modules/mvvm/src/index");
    const $ = require("node_modules/jquery/dist/jquery");
    __export(require("node_modules/mvvm/src/index"));
    let registeredView = [];
    function View(options) {
        return (constructor) => {
            registeredView.push({
                construct: constructor,
                binding: options.binding,
                html: new Promise((resolve, reject) => {
                    options.html && resolve(options.html);
                    options.template && !options.html && (() => {
                        $("<div>").load(options.template, (template, status) => {
                            status == "error" && (reject() || true) ||
                                resolve(template);
                        });
                    })();
                })
            });
        };
    }
    exports.View = View;
    function bindView($element, bindings, viewmodel) {
        var config = [];
        index_1.foreach(bindings, (binding, selector) => {
            var $el = selector.trim() === "this" && $element || $element.find(selector);
            config.push({
                $el: $el,
                binding: binding
            });
        });
        index_1.foreach(config, (conf) => {
            conf.$el.each((i, el) => {
                if ($element[0] === el || $element.find(el).length > 0) {
                    index_3.applyBinding(conf.binding, el, viewmodel);
                }
            });
        });
    }
    class Subview extends index_3.BindingHandler {
        constructor(valueAccessor) {
            super(valueAccessor);
        }
        update(element, allBinding, viewmodel, context) {
            var $element = $(element);
            var array = this.valueAccessor();
            var htmls = index_1.map(array, (item) => {
                var viewType = index_1.grep(registeredView, (view) => view.construct.prototype instanceof item.type || item.type === view.construct)[0];
                var view = serviceProvider && serviceProvider.createService(viewType.construct) || new viewType.construct();
                item.constructor && item.constructor(view);
                return viewType.html.then(value => {
                    var $el = $(value);
                    bindView($el, viewType.binding, view);
                    return $el;
                });
            });
            Promise.all(htmls).then((results) => {
                $element.html("");
                index_1.foreach(results, $el => $element.append($el));
            });
        }
    }
    exports.Subview = Subview;
    function start(el, type) {
        var element = el;
        !element.viewmodel && (index_3.applyBinding([
            new Subview((ctx) => [element.viewmodel.view()])
        ], element, element.viewmodel = {
            view: index_2.object({
                type: type
            })
        }) || true) || element.viewmodel.view({ type: type });
    }
    exports.start = start;
    let serviceProvider;
    function setServiceProvider(value) {
        serviceProvider = value;
    }
    exports.setServiceProvider = setServiceProvider;
});
//# sourceMappingURL=view.js.map