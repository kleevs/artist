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
        define(["require", "exports", "../../../src/index", "./form", "./detail", "./list", "./saved", "../../../src/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const index_1 = require("../../../src/index");
    const form_1 = require("./form");
    const detail_1 = require("./detail");
    const list_1 = require("./list");
    const saved_1 = require("./saved");
    const index_2 = require("../../../src/index");
    class ILayout {
    }
    exports.ILayout = ILayout;
    let Layout = class Layout extends ILayout {
        constructor() {
            super();
        }
        add(person) {
            this.list && this.list.add(person);
        }
        save(persons) {
            this.saved && this.saved.save(persons);
        }
        selected() {
            return this.list.selected();
        }
    };
    Layout = __decorate([
        index_1.View({
            template: "tmpl/layout.html",
            binding: {
                "[form]": [new index_2.Subview((ctx) => [{ type: form_1.IForm, constructor: (form) => form.parent = ctx }])],
                "[detail]": [new index_2.Subview((ctx) => [{ type: detail_1.IDetail, constructor: (detail) => detail.parent = ctx }])],
                "[list]": [new index_2.Subview((ctx) => [{ type: list_1.IList, constructor: (list) => { ctx.list = list; list.parent = ctx; } }])],
                "[saved]": [new index_2.Subview((ctx) => [{ type: saved_1.ISaved, constructor: (saved) => ctx.saved = saved }])]
            }
        }),
        __metadata("design:paramtypes", [])
    ], Layout);
});
//# sourceMappingURL=layout.js.map