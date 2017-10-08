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
    class ISaved {
    }
    exports.ISaved = ISaved;
    let Saved = class Saved extends ISaved {
        constructor() {
            super();
            this.array = index_1.object();
        }
        save(person) {
            this.array(person);
        }
    };
    Saved = __decorate([
        index_2.View({
            template: "tmpl/saved.html",
            binding: {
                "[panel-title]": [new index_3.Text((ctx) => "Saved")],
                "table tbody": [new index_3.ForEach((ctx) => {
                        return {
                            array: ctx.array(),
                            config: {
                                "[first]": (row) => [new index_3.Text((row) => row.first)],
                                "[last]": (row) => [new index_3.Text((row) => row.last)],
                                "[full]": (row) => [new index_3.Text((row) => $.grep([row.first, row.last], (item) => !!item).join(" "))],
                                "[age]": (row) => [new index_3.Text((row) => row.age)]
                            }
                        };
                    })]
            }
        }),
        __metadata("design:paramtypes", [])
    ], Saved);
});
//# sourceMappingURL=saved.js.map