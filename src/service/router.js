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
        define(["require", "exports", "../core/service", "../service/configManager"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const service_1 = require("../core/service");
    const configManager_1 = require("../service/configManager");
    class IRouter {
    }
    exports.IRouter = IRouter;
    let Router = class Router extends IRouter {
        constructor(configManager) {
            super();
            this.configManager = configManager;
            this._callbacks = [];
            window.onpopstate = (state) => this.change(location.href);
        }
        on(callback) {
            var parsed = this.parse(location.href);
            callback(parsed.href, parsed.pathname, parsed.hash);
            this._callbacks.push(callback);
        }
        trigger(href) {
            history.pushState({}, '', href);
            this.change(href);
        }
        change(str) {
            var parsed = this.parse(str);
            this._callbacks.forEach(callback => callback(parsed.href, parsed.pathname, parsed.hash));
        }
        parse(href) {
            var a = document.createElement('a');
            a.href = href;
            return a;
        }
        getUrl(localUri) {
            var configuration = this.configManager.getConfig();
            var url = localUri;
            if (configuration && configuration.path) {
                configuration.path.some(path => {
                    if (url.match(path.test)) {
                        url = url.replace(path.test, path.result);
                        return true;
                    }
                });
            }
            return url;
        }
    };
    Router = __decorate([
        service_1.Service({
            key: IRouter
        }),
        __metadata("design:paramtypes", [configManager_1.IConfigManager])
    ], Router);
    exports.Router = Router;
});
