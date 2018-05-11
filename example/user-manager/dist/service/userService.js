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
define(["require", "exports", "node_modules/artist/dist/artist", "../model/user"], function (require, exports, artist_1, user_1) {
    "use strict";
    exports.__esModule = true;
    var IUserService = /** @class */ (function () {
        function IUserService() {
        }
        return IUserService;
    }());
    exports.IUserService = IUserService;
    var UserService = /** @class */ (function (_super) {
        __extends(UserService, _super);
        function UserService() {
            var _this = _super.call(this) || this;
            _this.users = [];
            _this.id = 1;
            // création de quelques tests
            _this.create({
                id: undefined,
                firstName: 'Ryan',
                lastName: 'Bob',
                birthdate: new Date(1989, 5, 10),
                login: 'ryan.bob',
                password: '1234',
                actif: true
            });
            _this.create({
                id: undefined,
                firstName: 'Michel',
                lastName: 'Morgan',
                birthdate: new Date(1982, 9, 17),
                login: 'mich',
                password: '4321',
                actif: true
            });
            return _this;
        }
        UserService.prototype.create = function (user) {
            var usr = new user_1.User();
            usr.id = this.id++;
            usr.firstName = user.firstName;
            usr.lastName = user.lastName;
            usr.birthdate = user.birthdate;
            usr.login = user.login;
            usr.password = user.password;
            usr.actif = user.actif;
            this.users.push(usr);
        };
        UserService.prototype.update = function (user) {
            var usr = this.users.filter(function (u) { return u.id !== user.id; })[0];
            if (usr) {
                usr.id = user.id;
                usr.firstName = user.firstName;
                usr.lastName = user.lastName;
                usr.birthdate = user.birthdate;
                usr.login = user.login;
                usr.password = user.password;
                usr.actif = user.actif;
            }
        };
        UserService.prototype.listAll = function () {
            return this.users;
        };
        UserService.prototype.remove = function (user) {
            this.users = this.users.filter(function (u) { return u.id !== user.id; });
        };
        UserService = __decorate([
            artist_1.Service({
                key: IUserService
            }),
            __metadata("design:paramtypes", [])
        ], UserService);
        return UserService;
    }(IUserService));
});
