(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../lib/binder/index", "./service", "node_modules/jquery/dist/jquery"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const index_1 = require("../lib/binder/index");
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
    class BindManager extends index_1.BindManager {
    }
    exports.BindManager = BindManager;
    exports.registeredView = [];
    function View(options) {
        return (constructor, metadata) => {
            options = constructor.prototype.__view__option__ = $.extend(true, constructor.prototype.__view__option__, options);
            var viewType;
            exports.registeredView.push(viewType = {
                construct: constructor,
                binding: options.binding,
                html: new Promise((resolve, reject) => {
                    options.html && resolve(options.html);
                    options.template && !options.html && (() => {
                        $("<div>").load(`/${options.template}`, (template, status) => {
                            status == "error" && (reject() || true) ||
                                resolve(template);
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
                            var t = $(template);
                            t.attr("artist-view", true);
                            foreach(binding, (valueAccessor, selector) => {
                                (selector.trim() === "this" && t || t.find(selector)).each((i, el) => {
                                    var binder = valueAccessor(view);
                                    var binders = binder && !(binder instanceof Array) && [binder] || binder;
                                    binders.forEach(b => new BindManager(el, service_1.serviceProvider).manage(b));
                                });
                            });
                            t[0].__view__ = view;
                            return t[0];
                        }));
                    }
                })(constructor, metadata);
                key = Object.getPrototypeOf(key);
            }
        };
    }
    exports.View = View;
});
