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
        define(["require", "exports", "artist", "../model/user"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const artist_1 = require("artist");
    const user_1 = require("../model/user");
    class IDetail {
    }
    exports.IDetail = IDetail;
    let Detail = class Detail extends IDetail {
        constructor(observalizer) {
            super();
            this.observable = observalizer.convert({ user: new user_1.User() });
        }
        select(user) {
            this.observable.user = user;
        }
    };
    Detail = __decorate([
        artist_1.View({
            template: "formulaire/tmpl/detail.html",
            binding: {
                "[panel-title]": (view) => artist_1.text(() => "Detail"),
                "#last": (view) => artist_1.value({ get: () => view.observable.user.last, set: (v) => view.observable.user.last = v }),
                "#first": (view) => artist_1.value({ get: () => view.observable.user.first, set: (v) => view.observable.user.first = v }),
                "#age": (view) => artist_1.value({ get: () => (view.observable.user.age || '').toString(), set: (v) => view.observable.user.age = parseInt(v) || undefined })
            }
        }),
        __metadata("design:paramtypes", [artist_1.IObservablizer])
    ], Detail);
});
//# sourceMappingURL=detail.js.map