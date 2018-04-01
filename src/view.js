var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "node_modules/binder/src/index", "./service", "./mixin", "node_modules/jquery/dist/jquery"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const index_1 = require("node_modules/binder/src/index");
    const service_1 = require("./service");
    const mixin_1 = require("./mixin");
    const $ = require("node_modules/jquery/dist/jquery");
    let registeredView = [];
    function View(options) {
        return (constructor, metadata) => {
            options = constructor.prototype.__view__option__ = $.extend(true, constructor.prototype.__view__option__, options);
            registeredView.push({
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
            service_1.Injectable({ key: constructor, registerable: false })(constructor, metadata);
        };
    }
    exports.View = View;
    class IViewProvider {
    }
    exports.IViewProvider = IViewProvider;
    let ViewProvider = class ViewProvider {
        newInstance(type, arg) {
            var viewType = type && mixin_1.grep(registeredView, (view) => view.construct.prototype instanceof type || type === view.construct)[0];
            var view = viewType && (service_1.serviceProvider && service_1.config.getService(viewType.construct) && service_1.serviceProvider.createService(viewType.construct) || new viewType.construct());
            var binding = viewType.binding;
            view && view.initialize && view.initialize(arg);
            viewType && (view.__elt__ = viewType.html.then(template => {
                var t = $(template);
                t.attr("artist-view", true);
                mixin_1.foreach(binding, (valueAccessor, selector) => {
                    (selector.trim() === "this" && t || t.find(selector)).each((i, el) => {
                        var binder = valueAccessor(view);
                        var binders = binder && !(binder instanceof Array) && [binder] || binder;
                        binders.forEach(b => new index_1.Binder(el).bind(b));
                    });
                });
                t[0].__view__ = view;
                return t[0];
            }));
            return view;
        }
        map(type) {
            return (arg) => this.newInstance(type, arg);
        }
        getNode(view) {
            return view && view.__elt__;
        }
        getView(element) {
            return element && element.__view__;
        }
    };
    ViewProvider = __decorate([
        service_1.Injectable({
            key: IViewProvider
        })
    ], ViewProvider);
    function view(valueAccessor) {
        return (element) => {
            var $element = $(element);
            $element.html("");
            return () => {
                var value = valueAccessor();
                var array = !value || value instanceof Array ? (value || []) : [value];
                var $deleted = $("<div>");
                var $added = $("<div>");
                Promise.all(array.map((item) => service_1.serviceProvider.getService(IViewProvider).getNode(item)))
                    .then((elts) => {
                    $element.children().each((i, el) => {
                        $(el).appendTo($deleted);
                    });
                    elts.forEach((el) => {
                        $element.append(el);
                    });
                    return elts;
                });
            };
        };
    }
    exports.view = view;
    function dom(option) {
        return (element) => {
            var $element = $(element);
            $element.on('custom:view:dom:remove', (e) => {
                if (e.target === e.currentTarget) {
                    option.out(e);
                }
            });
            $element.on('custom:view:dom:added', (e) => {
                if (e.target === e.currentTarget) {
                    option.in(e);
                }
            });
            return () => { };
        };
    }
    exports.dom = dom;
});
//# sourceMappingURL=view.js.map