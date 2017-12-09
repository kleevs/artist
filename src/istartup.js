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
        define(["require", "exports", "node_modules/observable/src/index", "node_modules/jquery/dist/jquery", "./view", "./service"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const index_1 = require("node_modules/observable/src/index");
    const $ = require("node_modules/jquery/dist/jquery");
    const view_1 = require("./view");
    const service_1 = require("./service");
    let StartView = class StartView {
        constructor(_viewProvider) {
            this._viewProvider = _viewProvider;
            this.view = index_1.observable();
        }
        renderView(type, callback) {
            var v = this._viewProvider.newInstance(type);
            this.view(v);
            v && this._viewProvider.getNode(v).then((element) => {
                callback(v);
            }) || callback(v);
        }
    };
    StartView = __decorate([
        view_1.View({
            html: "<div></div>",
            binding: {
                "this": (startView) => view_1.view(() => startView.view())
            }
        }),
        __metadata("design:paramtypes", [view_1.IViewProvider])
    ], StartView);
    ;
    let StartService = class StartService extends StartView {
        constructor(viewProvider) {
            super(viewProvider);
        }
    };
    StartService = __decorate([
        service_1.Service({
            interface: StartView
        }),
        __metadata("design:paramtypes", [view_1.IViewProvider])
    ], StartService);
    class IStartUp {
        constructor(_selector) {
            this._selector = _selector;
            var viewProvider = service_1.provider.getService(view_1.IViewProvider);
            viewProvider.getNode(this._starter = viewProvider.newInstance(StartView)).then((el) => $(_selector).append(el));
        }
        renderView(type, callback) {
            this._starter.renderView(type, callback);
        }
    }
    exports.IStartUp = IStartUp;
});
//# sourceMappingURL=istartup.js.map