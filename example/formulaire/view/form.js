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
        define(["require", "exports", "node_modules/binder/src/index", "../../../dist/artist", "../model/user"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const index_1 = require("node_modules/binder/src/index");
    const artist_1 = require("../../../dist/artist");
    const user_1 = require("../model/user");
    class IForm {
    }
    IForm.AddUserEvent = new artist_1.Event("AddUserEvent");
    exports.IForm = IForm;
    let Form = class Form extends IForm {
        constructor(observalizer, _notifier) {
            super();
            this._notifier = _notifier;
            this.observable = observalizer.convert({
                last: undefined,
                first: undefined,
                age: undefined
            });
        }
        add() {
            var usr = new user_1.User();
            usr.last = this.observable.last;
            usr.first = this.observable.first;
            usr.age = this.observable.age;
            this._notifier.forEvent(IForm.AddUserEvent).notify(this, usr);
        }
        clear() {
            this.observable.last = undefined;
            this.observable.first = undefined;
            this.observable.age = undefined;
        }
    };
    Form = __decorate([
        artist_1.View({
            template: "formulaire/tmpl/form.html",
            binding: {
                "[panel-title]": (view) => index_1.text(() => "Formulaire"),
                "#last": (view) => index_1.value({ get: () => view.observable.last, set: (v) => view.observable.last = v }),
                "#first": (view) => index_1.value({ get: () => view.observable.first, set: (v) => view.observable.first = v }),
                "#age": (view) => index_1.value({ get: () => (view.observable.age || '').toString(), set: (v) => view.observable.age = parseInt(v) || undefined }),
                "[data-action=add]": (view) => index_1.click(() => () => view.add() || false),
                "[data-action=clear]": (view) => index_1.click(() => () => view.clear() || false)
            }
        }),
        __metadata("design:paramtypes", [artist_1.IObservablizer, artist_1.INotifier])
    ], Form);
});
//# sourceMappingURL=form.js.map