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
define(["require", "exports", "artiste", "node_modules/jquery/dist/jquery"], function (require, exports, artiste_1, $) {
    "use strict";
    exports.__esModule = true;
    var IList = /** @class */ (function () {
        function IList() {
        }
        IList.SelectUserEvent = new artiste_1.Event("SelectUserEvent");
        IList.SaveUsersEvent = new artiste_1.Event("SaveUsersEvent");
        return IList;
    }());
    exports.IList = IList;
    var List = /** @class */ (function (_super) {
        __extends(List, _super);
        function List(_observalizer, _notifier) {
            var _this = _super.call(this) || this;
            _this._observalizer = _observalizer;
            _this._notifier = _notifier;
            _this.observable = _observalizer.convert({
                users: []
            });
            return _this;
        }
        List.prototype.add = function (user) {
            this.observable.users.push(this._observalizer.convert(user));
        };
        List.prototype.select = function (user) {
            this._notifier.forEvent(IList.SelectUserEvent).notify(this, user);
        };
        List.prototype.save = function () {
            this._notifier.forEvent(IList.SaveUsersEvent).notify(this, JSON.parse(JSON.stringify(this.observable.users)));
        };
        List.prototype.clear = function () {
            this.observable.users = [];
        };
        List = __decorate([
            artiste_1.View({
                template: "dist/tmpl/list.html",
                binding: {
                    "[panel-title]": function (view) { return artiste_1.text(function () { return "List"; }); },
                    "[data-action=save]": function (view) { return artiste_1.click(function () { return function () { return view.save() || false; }; }); },
                    "[data-action=clear]": function (view) { return artiste_1.click(function () { return function () { return view.clear() || false; }; }); },
                    "table tbody": function (view) { return artiste_1.each(function () {
                        return $.map(view.observable.users, function (row) {
                            return {
                                "this": artiste_1.click(function () { return function () { return view.select(row) || false; }; }),
                                "[first]": artiste_1.text(function () { return row.first; }),
                                "[last]": artiste_1.text(function () { return row.last; }),
                                "[full]": artiste_1.text(function () { return $.grep([row.first, row.last], function (item) { return !!item; }).join(" "); }),
                                "[age] input": artiste_1.value({ get: function () { return (row.age || "").toString(); }, set: function (v) { return row.age = parseInt(v) || undefined; } })
                            };
                        });
                    }); }
                }
            }),
            __metadata("design:paramtypes", [typeof (_a = typeof artiste_1.IObservablizer !== "undefined" && artiste_1.IObservablizer) === "function" && _a || Object, typeof (_b = typeof artiste_1.INotifier !== "undefined" && artiste_1.INotifier) === "function" && _b || Object])
        ], List);
        return List;
        var _a, _b;
    }(IList));
});
