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
        define(["require", "exports", "../../../src/index", "node_modules/jquery/dist/jquery", "../../../src/index", "../service/app"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const index_1 = require("../../../src/index");
    const $ = require("node_modules/jquery/dist/jquery");
    const index_2 = require("../../../src/index");
    const app_1 = require("../service/app");
    class ISaved {
    }
    exports.ISaved = ISaved;
    let Saved = class Saved extends ISaved {
        constructor(_app) {
            super();
            this._app = _app;
        }
    };
    Saved = __decorate([
        index_1.View({
            template: "tmpl/saved.html",
            binding: {
                "[panel-title]": [new index_2.Text((ctx) => "Saved")],
                "table tbody": [new index_2.ForEach((ctx) => {
                        return {
                            array: ctx._app.getArchived(),
                            config: {
                                "[first]": [new index_2.Text((row) => row.first())],
                                "[last]": [new index_2.Text((row) => row.last())],
                                "[full]": [new index_2.Text((row) => $.grep([row.first(), row.last()], (item) => !!item).join(" "))],
                                "[age]": [new index_2.Text((row) => row.age())]
                            }
                        };
                    })]
            }
        }),
        __metadata("design:paramtypes", [app_1.IApp])
    ], Saved);
});
//# sourceMappingURL=saved.js.map