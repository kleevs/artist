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
        define(["require", "exports", "artist", "node_modules/jquery/dist/jquery"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const artist_1 = require("artist");
    const $ = require("node_modules/jquery/dist/jquery");
    class IList {
    }
    IList.SelectUserEvent = new artist_1.Event("SelectUserEvent");
    IList.SaveUsersEvent = new artist_1.Event("SaveUsersEvent");
    exports.IList = IList;
    let List = class List extends IList {
        constructor(_observalizer, _notifier) {
            super();
            this._observalizer = _observalizer;
            this._notifier = _notifier;
            this.observable = _observalizer.convert({
                users: []
            });
        }
        add(user) {
            this.observable.users.push(this._observalizer.convert(user));
        }
        select(user) {
            this._notifier.forEvent(IList.SelectUserEvent).notify(this, user);
        }
        save() {
            this._notifier.forEvent(IList.SaveUsersEvent).notify(this, JSON.parse(JSON.stringify(this.observable.users)));
        }
        clear() {
            this.observable.users = [];
        }
    };
    List = __decorate([
        artist_1.View({
            template: "formulaire/tmpl/list.html",
            binding: {
                "[panel-title]": (view) => artist_1.text(() => "List"),
                "[data-action=save]": (view) => artist_1.click(() => () => view.save() || false),
                "[data-action=clear]": (view) => artist_1.click(() => () => view.clear() || false),
                "table tbody": (view) => artist_1.each(() => {
                    return $.map(view.observable.users, (row) => {
                        return {
                            "this": artist_1.click(() => () => view.select(row) || false),
                            "[first]": artist_1.text(() => row.first),
                            "[last]": artist_1.text(() => row.last),
                            "[full]": artist_1.text(() => $.grep([row.first, row.last], (item) => !!item).join(" ")),
                            "[age] input": artist_1.value({ get: () => (row.age || "").toString(), set: (v) => row.age = parseInt(v) || undefined })
                        };
                    });
                })
            }
        }),
        __metadata("design:paramtypes", [artist_1.IObservablizer, artist_1.INotifier])
    ], List);
});
//# sourceMappingURL=list.js.map