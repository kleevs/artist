var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../lib/polyfills/promise", "../lib/binder/index", "../lib/dom/index", "./service", "../service/ajax"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    require("../lib/polyfills/promise");
    var index_1 = require("../lib/binder/index");
    var index_2 = require("../lib/dom/index");
    var service_1 = require("./service");
    var ajax_1 = require("../service/ajax");
    function foreach(item, callback) {
        var i;
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
    var BindManager = /** @class */ (function (_super) {
        __extends(BindManager, _super);
        function BindManager(element, data) {
            if (data === void 0) { data = undefined; }
            return _super.call(this, element, data) || this;
        }
        /** @description Applique le lien entre l'élément du DOM et le binder.
         * @param {callback} Binder Binder à lier.
         * @return void
         */
        BindManager.prototype.manage = function (callback) {
            _super.prototype.manage.call(this, callback);
        };
        return BindManager;
    }(index_1.BindManager));
    exports.BindManager = BindManager;
    exports.registeredView = [];
    function View(options) {
        return function (constructor, metadata) {
            options = constructor.prototype.__view__option__ = Object.assign({}, constructor.prototype.__view__option__, options);
            var viewType;
            exports.registeredView.push(viewType = {
                construct: constructor,
                binding: options.binding,
                html: new Promise(function (resolve, reject) {
                    options.html && resolve(options.html);
                    options.template && !options.html && (function () {
                        service_1.serviceProvider.getService(ajax_1.IAjax).ajax({ url: "/" + options.template, method: 'GET' }).then(function (response) {
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
                    initialize: function (view) {
                        var binding = viewType.binding;
                        viewType && (view.__elt__ = viewType.html.then(function (template) {
                            var t = index_2.createElement(template);
                            t.setAttribute("artist-view", "true");
                            foreach(binding, function (valueAccessor, selector) {
                                (selector.trim() === "this" && [t] || t.querySelectorAll(selector)).forEach(function (el) {
                                    var binder = valueAccessor(view);
                                    var binders = binder && !(binder instanceof Array) && [binder] || binder;
                                    binders.forEach(function (b) { return new BindManager(el, service_1.serviceProvider).manage(b); });
                                });
                            });
                            view && view.initialize && view.initialize();
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
