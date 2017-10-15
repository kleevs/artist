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
        define(["require", "exports", "../../../src/index", "../model/user", "../../../src/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const index_1 = require("../../../src/index");
    const user_1 = require("../model/user");
    const index_2 = require("../../../src/index");
    class IApp {
    }
    exports.IApp = IApp;
    let App = class App extends IApp {
        constructor() {
            super();
            this._users = [];
            this._archived = [];
            this._formulaire = index_1.object(new user_1.User());
            this._detail = index_1.object(new user_1.User());
        }
        add() {
            var user = this._formulaire();
            var usr = new user_1.User();
            usr.age(user.age());
            usr.last(user.last());
            usr.first(user.first());
            this._users.push(usr);
        }
        clearUser() {
            this._formulaire(new user_1.User());
        }
        clearUsers() {
            this._users.length = 0;
        }
        save() {
            this._archived.length = 0;
            this._users.forEach(user => this._archived.push(user));
        }
        select(user) {
            this._detail(user);
        }
        getUsers() {
            return this._users;
        }
        getArchived() {
            return this._archived;
        }
        getSelected() {
            return this._detail();
        }
        getFormulaire() {
            return this._formulaire();
        }
    };
    App = __decorate([
        index_2.Service({
            interface: IApp
        }),
        __metadata("design:paramtypes", [])
    ], App);
});
//# sourceMappingURL=app.js.map