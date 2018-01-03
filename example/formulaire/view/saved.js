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
        define(["require", "exports", "node_modules/binder/src/index", "../../../dist/artist", "node_modules/jquery/dist/jquery"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const index_1 = require("node_modules/binder/src/index");
    const artist_1 = require("../../../dist/artist");
    const $ = require("node_modules/jquery/dist/jquery");
    class ISaved {
    }
    exports.ISaved = ISaved;
    let Saved = Saved_1 = class Saved extends ISaved {
        constructor(observalizer) {
            super();
            this.observable = observalizer.convert({
                users: []
            });
        }
        save(users) {
            this.observable.users = users;
        }
    };
    Saved = Saved_1 = __decorate([
        artist_1.View({
            template: "formulaire/tmpl/saved.html",
            binding: {
                "[panel-title]": (view) => index_1.text(() => "Saved"),
                "table tbody": (view) => index_1.each(() => {
                    return $.map(view.observable.users, (row) => {
                        return {
                            "[first]": index_1.text(() => row.first),
                            "[last]": index_1.text(() => row.last),
                            "[full]": index_1.text(() => $.grep([row.first, row.last], (item) => !!item).join(" ")),
                            "[age]": index_1.text(() => row.age)
                        };
                    });
                })
            }
        }),
        artist_1.Service({ interface: Saved_1 }),
        __metadata("design:paramtypes", [artist_1.IObservablizer])
    ], Saved);
    var Saved_1;
});
//# sourceMappingURL=saved.js.map