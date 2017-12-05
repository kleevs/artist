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
        define(["require", "exports", "node_modules/binder/src/index", "../../../src/index", "node_modules/jquery/dist/jquery"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const index_1 = require("node_modules/binder/src/index");
    const index_2 = require("../../../src/index");
    const $ = require("node_modules/jquery/dist/jquery");
    class IList {
    }
    IList.SelectUserEvent = "SelectUserEvent";
    IList.SaveUsersEvent = "SaveUsersEvent";
    exports.IList = IList;
    let List = List_1 = class List extends IList {
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
            this._notifier.notify(this, IList.SelectUserEvent, user);
        }
        save() {
            this._notifier.notify(this, IList.SaveUsersEvent, JSON.parse(JSON.stringify(this.observable.users)));
        }
        clear() {
            this.observable.users = [];
        }
    };
    List = List_1 = __decorate([
        index_2.View({
            template: "example/formulaire/tmpl/list.html",
            binding: {
                "[panel-title]": (view) => index_1.text(() => "List"),
                "[data-action=save]": (view) => index_1.click(() => () => view.save() || false),
                "[data-action=clear]": (view) => index_1.click(() => () => view.clear() || false),
                "table tbody": (view) => index_1.each(() => {
                    return $.map(view.observable.users, (row) => {
                        return {
                            "this": index_1.click(() => () => view.select(row) || false),
                            "[first]": index_1.text(() => row.first),
                            "[last]": index_1.text(() => row.last),
                            "[full]": index_1.text(() => $.grep([row.first, row.last], (item) => !!item).join(" ")),
                            "[age] input": index_1.value({ get: () => (row.age || "").toString(), set: (v) => row.age = parseInt(v) || undefined })
                        };
                    });
                })
            }
        }),
        index_2.Service({ interface: List_1 }),
        __metadata("design:paramtypes", [index_2.IObservablizer, index_2.INotifier])
    ], List);
    var List_1;
});
//# sourceMappingURL=list.js.map