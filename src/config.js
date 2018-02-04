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
        define(["require", "exports", "./service"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const service_1 = require("./service");
    class IConfig {
        route(hash) {
            return new Promise((resolve, reject) => {
                window.require(`/${hash}`).then((module) => {
                    for (var i in module) {
                        resolve(module[i]);
                        break;
                    }
                });
            });
        }
        loaded(hash, view) { }
    }
    exports.IConfig = IConfig;
    let Config = class Config extends IConfig {
        constructor() {
            super();
        }
    };
    Config = __decorate([
        service_1.Service({
            interface: IConfig
        }),
        __metadata("design:paramtypes", [])
    ], Config);
    exports.Config = Config;
});
//# sourceMappingURL=config.js.map