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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../core/service", "../lib/amd-loader/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var service_1 = require("../core/service");
    var index_1 = require("../lib/amd-loader/index");
    var IModuleProvider = /** @class */ (function () {
        function IModuleProvider() {
        }
        return IModuleProvider;
    }());
    exports.IModuleProvider = IModuleProvider;
    var ModuleProvider = /** @class */ (function (_super) {
        __extends(ModuleProvider, _super);
        function ModuleProvider() {
            return _super.call(this) || this;
        }
        ModuleProvider.prototype.get = function (uri) {
            return index_1.load("/" + uri);
        };
        ModuleProvider = __decorate([
            service_1.Service({
                key: IModuleProvider
            }),
            __metadata("design:paramtypes", [])
        ], ModuleProvider);
        return ModuleProvider;
    }(IModuleProvider));
    exports.ModuleProvider = ModuleProvider;
});
