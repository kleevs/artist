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
    var IList = /** @class */ (function () {
        function IList() {
        }
        return IList;
    }());
    exports.IList = IList;
    var List = /** @class */ (function (_super) {
        __extends(List, _super);
        function List(observablizer) {
            var _this = _super.call(this) || this;
            _this.observable = observablizer.convert({ list: [] });
            return _this;
        }
        List.prototype.remove = function (user) {
            this.observable.list = this.observable.list.filter(function (u) { return u.id !== user.id; });
            return true;
        };
        List.prototype.add = function (user) {
            this.observable.list.push(user);
        };
        List.prototype.getById = function (userid) {
            return this.observable.list.filter(function (u) { return u.id === userid; })[0];
        };
        List = __decorate([
            artiste_1.View({
                template: "dist/template/list.html",
                binding: {
                    "tbody": function (userView) { return artiste_1.each(function () {
                        return userView.observable.list.map(function (user) {
                            return {
                                "[data-id=first-name]": artiste_1.text(function () { return user.firstName; }),
                                "[data-id=last-name]": artiste_1.text(function () { return user.lastName; }),
                                "[data-id=birthdate]": artiste_1.text(function () { return user.birthdate && user.birthdate.toDateString(); }),
                                "[data-id=login]": artiste_1.text(function () { return user.login; }),
                                "[data-id=password]": artiste_1.text(function () { return user.password; }),
                                "[data-id=actif]": artiste_1.text(function () { return user.actif ? 'Actif' : 'Inactif'; }),
                                "[data-id=action] a": artiste_1.attr(function () { return { href: "/#/update/" + user.id }; }),
                                "[data-id=action] button": artiste_1.click(function () { return function () { return userView.remove(user); }; })
                            };
                        });
                    }); }
                }
            }),
            __metadata("design:paramtypes", [typeof (_a = typeof artiste_1.IObservablizer !== "undefined" && artiste_1.IObservablizer) === "function" && _a || Object])
        ], List);
        return List;
        var _a;
    }(IList));
});
