var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../lib/polyfills/promise", "../core/service", "../service/serviceProvider", "../core/view"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    require("../lib/polyfills/promise");
    var service_1 = require("../core/service");
    var serviceProvider_1 = require("../service/serviceProvider");
    var view_1 = require("../core/view");
    /** @description Interface du service fournisseur de vue.
     */
    var IViewProvider = /** @class */ (function () {
        function IViewProvider() {
        }
        return IViewProvider;
    }());
    exports.IViewProvider = IViewProvider;
    var ViewProvider = /** @class */ (function () {
        function ViewProvider(_serviceProvider) {
            this._serviceProvider = _serviceProvider;
        }
        ViewProvider.prototype.newInstance = function (type, arg) {
            var viewType = type && view_1.registeredView.filter(function (view) { return (view.construct.prototype instanceof type) || (type === view.construct); })[0];
            var view = viewType && (this._serviceProvider && service_1.config.getService(viewType.construct) && this._serviceProvider.createService(viewType.construct) || new viewType.construct());
            return view;
        };
        ViewProvider.prototype.map = function (type) {
            var _this = this;
            return function (arg) { return _this.newInstance(type, arg); };
        };
        ViewProvider.prototype.getNode = function (view) {
            return view && view.__elt__;
        };
        ViewProvider.prototype.getView = function (element) {
            return element && element.__view__;
        };
        ViewProvider = __decorate([
            service_1.Service({
                key: IViewProvider
            }),
            __metadata("design:paramtypes", [serviceProvider_1.IServiceProvider])
        ], ViewProvider);
        return ViewProvider;
    }());
    exports.ViewProvider = ViewProvider;
});
