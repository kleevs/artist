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
        define(["require", "exports", "../../../src/index", "../../../src/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const index_1 = require("../../../src/index");
    const index_2 = require("../../../src/index");
    class IDetail {
    }
    exports.IDetail = IDetail;
    let Detail = class Detail extends IDetail {
        constructor() {
            super();
        }
        initialize(viewParent) {
            this.parent = viewParent;
        }
    };
    Detail = __decorate([
        index_1.View({
            template: "tmpl/detail.html",
            binding: {
                "[panel-title]": [new index_2.Text(() => "Detail")],
                "#last": [new index_2.Value((ctx) => { return (ctx.parent.selected() || { last: () => { } }).last; })],
                "#first": [new index_2.Value((ctx) => { return (ctx.parent.selected() || { first: () => { } }).first; })],
                "#age": [new index_2.Value((ctx) => { return (ctx.parent.selected() || { age: () => { } }).age; })]
            }
        }),
        __metadata("design:paramtypes", [])
    ], Detail);
});
//# sourceMappingURL=detail.js.map