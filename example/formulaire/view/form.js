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
        define(["require", "exports", "node_modules/observable/src/index", "../../../src/index", "../../../src/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const index_1 = require("node_modules/observable/src/index");
    const index_2 = require("../../../src/index");
    const index_3 = require("../../../src/index");
    class IForm {
    }
    exports.IForm = IForm;
    let Form = class Form extends IForm {
        constructor() {
            super();
            this.last = index_1.object('');
            this.first = index_1.object('');
            this.age = index_1.object();
        }
        initialize(viewParent) {
            this.parent = viewParent;
        }
        add() {
            this.parent.add({
                last: this.last(),
                first: this.first(),
                age: this.age()
            });
        }
        clear() {
            this.last('');
            this.first('');
            this.age('');
        }
    };
    Form = __decorate([
        index_2.View({
            template: "tmpl/form.html",
            binding: {
                "[panel-title]": [new index_3.Text(() => "Forme")],
                "#last": [new index_3.Value((ctx) => { return ctx.last; })],
                "#first": [new index_3.Value((ctx) => { return ctx.first; })],
                "#age": [new index_3.Value((ctx) => { return ctx.age; })],
                "[data-action=add]": [new index_3.Click((ctx) => () => ctx.add() || false)],
                "[data-action=clear]": [new index_3.Click((ctx) => () => ctx.clear() || false)]
            }
        }),
        __metadata("design:paramtypes", [])
    ], Form);
});
//# sourceMappingURL=form.js.map