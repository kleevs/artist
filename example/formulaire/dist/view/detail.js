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
define(["require", "exports", "artiste", "../model/user"], function (require, exports, artiste_1, user_1) {
    "use strict";
    exports.__esModule = true;
    var IDetail = /** @class */ (function () {
        function IDetail() {
        }
        return IDetail;
    }());
    exports.IDetail = IDetail;
    var Detail = /** @class */ (function (_super) {
        __extends(Detail, _super);
        function Detail(observalizer) {
            var _this = _super.call(this) || this;
            _this.observable = observalizer.convert({ user: new user_1.User() });
            return _this;
        }
        Detail.prototype.select = function (user) {
            this.observable.user = user;
        };
        Detail = __decorate([
            artiste_1.View({
                template: "dist/tmpl/detail.html",
                binding: {
                    "[panel-title]": function (view) { return artiste_1.text(function () { return "Detail"; }); },
                    "#last": function (view) { return artiste_1.value({ get: function () { return view.observable.user.last; }, set: function (v) { return view.observable.user.last = v; } }); },
                    "#first": function (view) { return artiste_1.value({ get: function () { return view.observable.user.first; }, set: function (v) { return view.observable.user.first = v; } }); },
                    "#age": function (view) { return artiste_1.value({ get: function () { return (view.observable.user.age || '').toString(); }, set: function (v) { return view.observable.user.age = parseInt(v) || undefined; } }); }
                }
            }),
            __metadata("design:paramtypes", [artiste_1.IObservablizer])
        ], Detail);
        return Detail;
    }(IDetail));
});
