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
    class IList {
    }
    exports.IList = IList;
    let List = class List extends IList {
        constructor(_app) {
            super();
            this._app = _app;
        }
        select(selected) {
            this._app.select(selected);
        }
        save() {
            this._app.save();
        }
        clear() {
            this._app.clearUsers();
        }
    };
    List = __decorate([
        index_1.View({
            template: "tmpl/list.html",
            binding: {
                "[panel-title]": [new index_2.Text(() => "List")],
                "[data-action=save]": [new index_2.Click((ctx) => () => ctx.save() || false)],
                "[data-action=clear]": [new index_2.Click((ctx) => () => ctx.clear() || false)],
                "table tbody": [new index_2.ForEach((ctx) => {
                        return {
                            array: ctx._app.getUsers(),
                            config: {
                                "this": [new index_2.Click((row) => () => ctx.select(row) || false)],
                                "[first]": [new index_2.Text((row) => { return row.first(); })],
                                "[last]": [new index_2.Text((row) => { return row.last(); })],
                                "[full]": [new index_2.Text((row) => { return $.grep([row.first(), row.last()], (item) => !!item).join(" "); })],
                                "[age] input": [new index_2.Value((row) => { return row.age; })]
                            }
                        };
                    })]
            }
        }),
        __metadata("design:paramtypes", [app_1.IApp])
    ], List);
});
//# sourceMappingURL=list.js.map