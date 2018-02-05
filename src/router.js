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
        define(["require", "exports", "./service", "node_modules/jquery/dist/jquery", "./cache", "./config"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const service_1 = require("./service");
    const $ = require("node_modules/jquery/dist/jquery");
    const cache_1 = require("./cache");
    const config_1 = require("./config");
    class IRouter {
    }
    exports.IRouter = IRouter;
    let Router = class Router extends IRouter {
        constructor(_config) {
            super();
            this._config = _config;
            this.cache = new cache_1.Cache();
        }
        onLoad(href) {
            return this.cache.promise(href, (resolve, reject) => {
                this._config.route(href).then(v => resolve(v));
            });
        }
        goTo(href) {
            return new Promise(resolve => {
                $("body").trigger("location:href", { href: href, resolve: resolve });
            });
        }
        onNext(href) {
            history.pushState({}, '', href);
            return this.onLoad(href);
        }
        onBack(href) {
            return this.onLoad(href);
        }
        onLoaded(href, view) {
            this._config.loaded(href, view);
        }
    };
    Router = __decorate([
        service_1.Service({
            interface: IRouter
        }),
        __metadata("design:paramtypes", [config_1.IConfig])
    ], Router);
    exports.Router = Router;
});
//# sourceMappingURL=router.js.map