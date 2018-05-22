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
define(["require", "exports", "node_modules/artistejs/dist/artiste"], function (require, exports, artiste_1) {
    "use strict";
    exports.__esModule = true;
    var IDetail = /** @class */ (function () {
        function IDetail() {
        }
        IDetail.Event = {
            Save: new artiste_1.Event("Detail.Save")
        };
        return IDetail;
    }());
    exports.IDetail = IDetail;
    var Detail = /** @class */ (function (_super) {
        __extends(Detail, _super);
        function Detail(observablizer, router, notifier) {
            var _this = _super.call(this) || this;
            _this.router = router;
            _this.notifier = notifier;
            _this.user = observablizer.convert({
                id: undefined,
                firstName: '',
                lastName: '',
                birthdate: undefined,
                login: '',
                password: '',
                actif: false
            });
            return _this;
        }
        Detail.prototype.setUser = function (user) {
            this.user.id = user.id;
            this.user.firstName = user.firstName;
            this.user.lastName = user.lastName;
            this.user.birthdate = user.birthdate;
            this.user.login = user.login;
            this.user.password = user.password;
            this.user.actif = user.actif;
        };
        Detail.prototype.save = function () {
            this.notifier.forEvent(IDetail.Event.Save).notify(this, {
                id: this.user.id,
                firstName: this.user.firstName,
                lastName: this.user.lastName,
                birthdate: this.user.birthdate,
                login: this.user.login,
                password: this.user.password,
                actif: this.user.actif
            });
            this.router.trigger("/#/");
            return true;
        };
        Detail.prototype.toStringDate = function (date) {
            return (date && date instanceof Date && date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() || date || '');
        };
        Detail.prototype.parseDate = function (str) {
            try {
                var arr = str && str.split("/");
                var date = new Date(parseInt(arr[2]), parseInt(arr[1]) - 1, parseInt(arr[0]));
                if (arr.length === 3 && arr[0].length <= 2 && arr[1].length <= 2 && arr[2].length == 4 && !isNaN(date.getTime())) {
                    return date;
                }
            }
            catch (e) { }
            return str;
        };
        Detail = __decorate([
            artiste_1.View({
                template: "dist/template/detail.html",
                binding: {
                    "[data-id=firstname]": function (detailView) { return artiste_1.value({ get: function () { return detailView.user.firstName; }, set: function (v) { return detailView.user.firstName = v; } }); },
                    "[data-id=lastname]": function (detailView) { return artiste_1.value({ get: function () { return detailView.user.lastName; }, set: function (v) { return detailView.user.lastName = v; } }); },
                    "[data-id=birthdate]": function (detailView) { return artiste_1.value({ get: function () { return detailView.toStringDate(detailView.user.birthdate); }, set: function (v) { return detailView.user.birthdate = detailView.parseDate(v); } }); },
                    "[data-id=login]": function (detailView) { return artiste_1.value({ get: function () { return detailView.user.login; }, set: function (v) { return detailView.user.login = v; } }); },
                    "[data-id=password]": function (detailView) { return artiste_1.value({ get: function () { return detailView.user.password; }, set: function (v) { return detailView.user.password = v; } }); },
                    "[data-id=actif]": function (detailView) { return artiste_1.value({ get: function () { return detailView.user.actif; }, set: function (v) { return detailView.user.actif = v; } }); },
                    "[data-id=save]": function (detailView) { return artiste_1.click(function () { return function () { return detailView.save(); }; }); }
                }
            }),
            __metadata("design:paramtypes", [artiste_1.IObservablizer,
                artiste_1.IRouter,
                artiste_1.INotifier])
        ], Detail);
        return Detail;
    }(IDetail));
});
