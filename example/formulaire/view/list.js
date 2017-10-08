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
        define(["require", "exports", "node_modules/observable/src/index", "../../../src/index", "node_modules/jquery/dist/jquery", "../../../src/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const index_1 = require("node_modules/observable/src/index");
    const index_2 = require("../../../src/index");
    const $ = require("node_modules/jquery/dist/jquery");
    const index_3 = require("../../../src/index");
    class IList {
    }
    exports.IList = IList;
    let List = class List extends IList {
        constructor() {
            super();
            this.array = index_1.object([]);
            this.selected = index_1.object();
        }
        add(person) {
            var array = this.array() || [];
            var obs = {};
            for (var key in person) {
                obs[key] = index_1.object(person[key]);
            }
            array.push(obs);
            this.array([].concat(array));
        }
        select(selected) {
            this.selected(selected);
        }
        save() {
            var array = this.array() || [];
            this.parent.save(JSON.parse(JSON.stringify(array)));
        }
        clear() {
            this.array([]);
            this.selected(undefined);
        }
    };
    List = __decorate([
        index_2.View({
            template: "tmpl/list.html",
            binding: {
                "[panel-title]": [new index_3.Text(() => "List")],
                "[data-action=save]": [new index_3.Click((ctx) => () => ctx.save() || false)],
                "[data-action=clear]": [new index_3.Click((ctx) => () => ctx.clear() || false)],
                "table tbody": [new index_3.ForEach((ctx) => {
                        return {
                            array: ctx.array(),
                            config: {
                                "this": (row) => [new index_3.Click((row) => () => ctx.select(row) || false)],
                                "[first]": (row) => [new index_3.Text((row) => { return row.first(); })],
                                "[last]": (row) => [new index_3.Text((row) => { return row.last(); })],
                                "[full]": (row) => [new index_3.Text((row) => { return $.grep([row.first(), row.last()], (item) => !!item).join(" "); })],
                                "[age] input": (row) => [new index_3.Value((row) => { return row.age; })]
                            }
                        };
                    })]
            }
        }),
        __metadata("design:paramtypes", [])
    ], List);
});
//# sourceMappingURL=list.js.map