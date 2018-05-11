var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "artist", "../model/user"], function (require, exports, artist_1, user_1) {
    "use strict";
    exports.__esModule = true;
    var IForm = /** @class */ (function () {
        function IForm() {
        }
        IForm.AddUserEvent = new artist_1.Event("AddUserEvent");
        return IForm;
    }());
    exports.IForm = IForm;
    var Form = /** @class */ (function (_super) {
        __extends(Form, _super);
        function Form(observalizer, _notifier) {
            var _this = _super.call(this) || this;
            _this._notifier = _notifier;
            _this.observable = observalizer.convert({
                last: undefined,
                first: undefined,
                age: undefined
            });
            return _this;
        }
        Form.prototype.add = function () {
            var usr = new user_1.User();
            usr.last = this.observable.last;
            usr.first = this.observable.first;
            usr.age = this.observable.age;
            this._notifier.forEvent(IForm.AddUserEvent).notify(this, usr);
        };
        Form.prototype.clear = function () {
            this.observable.last = undefined;
            this.observable.first = undefined;
            this.observable.age = undefined;
        };
        Form = __decorate([
            artist_1.View({
                template: "dist/tmpl/form.html",
                binding: {
                    "[panel-title]": function (view) { return artist_1.text(function () { return "Formulaire"; }); },
                    "#last": function (view) { return artist_1.value({ get: function () { return view.observable.last; }, set: function (v) { return view.observable.last = v; } }); },
                    "#first": function (view) { return artist_1.value({ get: function () { return view.observable.first; }, set: function (v) { return view.observable.first = v; } }); },
                    "#age": function (view) { return artist_1.value({ get: function () { return (view.observable.age || '').toString(); }, set: function (v) { return view.observable.age = parseInt(v) || undefined; } }); },
                    "[data-action=add]": function (view) { return artist_1.click(function () { return function () { return view.add() || false; }; }); },
                    "[data-action=clear]": function (view) { return artist_1.click(function () { return function () { return view.clear() || false; }; }); }
                }
            }),
            __metadata("design:paramtypes", [artist_1.IObservablizer, artist_1.INotifier])
        ], Form);
        return Form;
    }(IForm));
});
