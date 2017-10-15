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
        define(["require", "exports", "../../../src/index", "../model/user"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const index_1 = require("../../../src/index");
    const user_1 = require("../model/user");
    class IApp {
    }
    exports.IApp = IApp;
    let App = class App extends IApp {
        constructor() {
            super();
            this._formulaire = index_1.object(new user_1.User());
            this._detail = index_1.object(new user_1.User());
            this._users = index_1.object([]);
            this._archived = index_1.object([]);
        }
        copy(user) {
            var usr = new user_1.User();
            usr.age(user.age());
            usr.last(user.last());
            usr.first(user.first());
            return usr;
        }
        add() {
            var users = this._users();
            var user = this._formulaire();
            users.push(this.copy(user));
            this._users(users);
        }
        clearUser() {
            this._formulaire(new user_1.User());
        }
        clearUsers() {
            this._users([]);
        }
        save() {
            var saved = [];
            this._users().forEach(user => saved.push(this.copy(user)));
            this._archived(saved);
        }
        select(user) {
            this._detail(user);
        }
        getUsers() {
            return this._users();
        }
        getArchived() {
            return this._archived();
        }
        getSelected() {
            return this._detail();
        }
        getFormulaire() {
            return this._formulaire();
        }
    };
    App = __decorate([
        index_1.Service({
            interface: IApp
        }),
        __metadata("design:paramtypes", [])
    ], App);
});
//# sourceMappingURL=app.js.map