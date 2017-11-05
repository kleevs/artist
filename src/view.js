(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "node_modules/observable/src/index", "node_modules/binder/src/index", "./service", "node_modules/jquery/dist/jquery"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const index_1 = require("node_modules/observable/src/index");
    const index_2 = require("node_modules/binder/src/index");
    const service_1 = require("./service");
    const $ = require("node_modules/jquery/dist/jquery");
    function foreach(item, callback) {
        let i;
        if (item instanceof Array) {
            for (i = 0; i < item.length; i++) {
                callback(item[i], i);
            }
        }
        else {
            for (i in item) {
                callback(item[i], i);
            }
        }
    }
    function map(array, parse) {
        let res = [];
        foreach(array, (x) => { res.push(parse(x)); return false; });
        return res;
    }
    function grep(array, predicate) {
        let i, res = [];
        for (i = 0; i < array.length; i++) {
            if (predicate(array[i], i))
                res.push(array[i]);
        }
        return res;
    }
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
    class SubviewHandler extends index_2.BindingHandler {
        constructor() {
            super();
            this._binder = new index_2.Binder(index_2.Htmls, (ctx) => this._observable());
            this._observable = index_1.object();
        }
        init(element, valueAccessor, viewmodel, context) {
            this._binder.bind(element, viewmodel, context);
        }
        update(element, valueAccessor, viewmodel, context) {
            var $element = $(element);
            var array = valueAccessor();
            index_1.wrap(() => {
                var htmls = map(array, (item) => {
                    var viewType = item && item.type && grep(registeredView, (view) => view.construct.prototype instanceof item.type || item.type === view.construct)[0];
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
    exports.SubviewHandler = SubviewHandler;
    function start(el, type, callback) {
        var element = el;
        !element.viewmodel && (new index_2.Binder(SubviewHandler, (ctx) => [element.viewmodel.view()]).bind(element, element.viewmodel = {
            view: index_1.object({
                type: type, callback: callback
            })
        }) || true) || element.viewmodel.view({ type: type, callback: callback });
    }
    exports.start = start;
});
//# sourceMappingURL=view.js.map