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
        define(["require", "exports", "../core/service"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var service_1 = require("../core/service");
    /** @description Interface du service fournisseur de service.
     */
    var IServiceProvider = /** @class */ (function () {
        function IServiceProvider() {
        }
        return IServiceProvider;
    }());
    exports.IServiceProvider = IServiceProvider;
    var ServiceProvider = /** @class */ (function (_super) {
        __extends(ServiceProvider, _super);
        function ServiceProvider() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ServiceProvider.prototype.getService = function (type) {
            return service_1.serviceProvider.getService(type);
        };
        ServiceProvider.prototype.createService = function (key, parameters) {
            return service_1.serviceProvider.createService(key, parameters);
        };
        ServiceProvider = __decorate([
            service_1.Service({
                key: IServiceProvider
            })
        ], ServiceProvider);
        return ServiceProvider;
    }(IServiceProvider));
    exports.ServiceProvider = ServiceProvider;
});
