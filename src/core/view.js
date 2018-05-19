(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../lib/binder/index", "../lib/dom/index", "./service", "../service/ajax"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const index_1 = require("../lib/binder/index");
    const index_2 = require("../lib/dom/index");
    const service_1 = require("./service");
    const ajax_1 = require("../service/ajax");
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
    /** @description Classe permettant de lier une partie du DOM à un binder
     */
    class BindManager extends index_1.BindManager {
        constructor(element, data = undefined) {
            super(element, data);
        }
        /** @description Applique le lien entre l'élément du DOM et le binder.
         * @param {callback} Binder Binder à lier.
         * @return void
         */
        manage(callback) {
            super.manage(callback);
        }
    }
    exports.BindManager = BindManager;
    exports.registeredView = [];
    function View(options) {
        return (constructor, metadata) => {
            options = constructor.prototype.__view__option__ = Object.assign({}, constructor.prototype.__view__option__, options);
            var viewType;
            exports.registeredView.push(viewType = {
                construct: constructor,
                binding: options.binding,
                html: new Promise((resolve, reject) => {
                    options.html && resolve(options.html);
                    options.template && !options.html && (() => {
                        service_1.serviceProvider.getService(ajax_1.IAjax).ajax({ url: `/${options.template}`, method: 'GET' }).then((response) => {
                            response.status == "error" && (reject() || true) ||
                                resolve(response.result);
                        });
                    })();
                })
            });
            var key = constructor;
            while (key && key.constructor !== key) {
                service_1.Service({
                    key: key,
                    registerable: false,
                    initialize: (view) => {
                        var binding = viewType.binding;
                        view && view.initialize && view.initialize();
                        viewType && (view.__elt__ = viewType.html.then(template => {
                            var t = index_2.createElement(template);
                            t.setAttribute("artist-view", "true");
                            foreach(binding, (valueAccessor, selector) => {
                                (selector.trim() === "this" && [t] || t.querySelectorAll(selector)).forEach((el) => {
                                    var binder = valueAccessor(view);
                                    var binders = binder && !(binder instanceof Array) && [binder] || binder;
                                    binders.forEach(b => new BindManager(el, service_1.serviceProvider).manage(b));
                                });
                            });
                            t.__view__ = view;
                            return t;
                        }));
                    }
                })(constructor, metadata);
                key = Object.getPrototypeOf(key);
            }
        };
    }
    exports.View = View;
});
