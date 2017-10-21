(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "node_modules/mixin/src/index", "node_modules/observable/src/index", "node_modules/mvvm/src/index", "./service", "node_modules/jquery/dist/jquery"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const index_1 = require("node_modules/mixin/src/index");
    const index_2 = require("node_modules/observable/src/index");
    const index_3 = require("node_modules/mvvm/src/index");
    const service_1 = require("./service");
    const $ = require("node_modules/jquery/dist/jquery");
    let registeredView = [];
    function View(options) {
        return (constructor, metadata) => {
            registeredView.push({
                construct: constructor,
                binding: options.binding,
                parameters: metadata && metadata["design:paramtypes"] || [],
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
    class Subview extends index_3.BindingHandler {
        constructor(valueAccessor) {
            super(valueAccessor);
            this._htmlsHandler = new index_3.Htmls((ctx) => this._observable());
            this._observable = index_2.object();
        }
        init(element, allBinding, viewmodel, context) {
            index_3.applyBinding([this._htmlsHandler], element, viewmodel, context);
        }
        update(element, allBinding, viewmodel, context) {
            var $element = $(element);
            var array = this.valueAccessor();
            index_2.wrap(() => {
                var htmls = index_1.map(array, (item) => {
                    var viewType = item && item.type && index_1.grep(registeredView, (view) => view.construct.prototype instanceof item.type || item.type === view.construct)[0];
                    var view = viewType && (service_1.provider && service_1.provider.createService(viewType.construct, viewType.parameters) || new viewType.construct());
                    view && view.initialize && view.initialize(viewmodel);
                    view && item.callback && item.callback(view);
                    return viewType && viewType.html.then(value => {
                        return { template: value, model: view, config: viewType.binding };
                    });
                });
                Promise.all(htmls).then((results) => {
                    this._observable(results);
                });
            }).silent();
        }
    }
    exports.Subview = Subview;
    function start(el, type, callback) {
        var element = el;
        !element.viewmodel && (index_3.applyBinding([
            new Subview((ctx) => [element.viewmodel.view()])
        ], element, element.viewmodel = {
            view: index_2.object({
                type: type, callback: callback
            })
        }) || true) || element.viewmodel.view({ type: type, callback: callback });
    }
    exports.start = start;
});
//# sourceMappingURL=view.js.map