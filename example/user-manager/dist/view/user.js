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
define(["require", "exports", "node_modules/artist/dist/artist", "../service/userService"], function (require, exports, artist_1, userService_1) {
    "use strict";
    exports.__esModule = true;
    var IUser = /** @class */ (function () {
        function IUser() {
        }
        return IUser;
    }());
    exports.IUser = IUser;
    var User = /** @class */ (function (_super) {
        __extends(User, _super);
        function User(observablizer, userService) {
            var _this = _super.call(this) || this;
            _this.userService = userService;
            _this.observable = observablizer.convert({ list: [] });
            _this.refresh();
            return _this;
        }
        User.prototype.remove = function (user) {
            this.userService.remove(user);
            this.refresh();
            return true;
        };
        User.prototype.refresh = function () {
            this.observable.list = this.userService.listAll();
        };
        User = __decorate([
            artist_1.View({
                template: "dist/template/user.html",
                binding: {
                    "tbody": function (userView) { return artist_1.each(function () {
                        return userView.observable.list.map(function (user) {
                            return {
                                "[data-id=first-name]": artist_1.text(function () { return user.firstName; }),
                                "[data-id=last-name]": artist_1.text(function () { return user.lastName; }),
                                "[data-id=birthdate]": artist_1.text(function () { return user.birthdate.toString(); }),
                                "[data-id=login]": artist_1.text(function () { return user.login; }),
                                "[data-id=password]": artist_1.text(function () { return user.password; }),
                                "[data-id=actif]": artist_1.text(function () { return user.actif ? 'Actif' : 'Inactif'; }),
                                "[data-id=action] a": artist_1.attr(function () { return { href: "/#/update/" + user.id }; }),
                                "[data-id=action] button": artist_1.click(function () { return function () { return userView.remove(user); }; })
                            };
                        });
                    }); }
                }
            }),
            __metadata("design:paramtypes", [artist_1.IObservablizer, userService_1.IUserService])
        ], User);
        return User;
    }(IUser));
});
