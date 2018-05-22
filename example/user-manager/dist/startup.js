var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "node_modules/artistejs/dist/artiste", "view/list", "view/detail", "model/user"], function (require, exports, artiste_1, list_1, detail_1, user_1) {
    "use strict";
    exports.__esModule = true;
    var Startup = /** @class */ (function () {
        function Startup(
            // services
            observablizer, notifier, router, 
            // sous vues
            listView, detailView) {
            var _this = this;
            this.notifier = notifier;
            this.listView = listView;
            this.detailView = detailView;
            this.id = 1;
            this.observable = observablizer.convert({ view: listView });
            this.notifier.forEvent(detail_1.IDetail.Event.Save).listen(detailView, function (data) {
                if (data.id) {
                    // modification
                    _this.listView.remove(data);
                    _this.listView.add(data);
                }
                else {
                    // ajout
                    data.id = _this.id++;
                    _this.listView.add(data);
                }
            });
            router.on(function (href, pathname, hash) {
                if (hash === "#/create") {
                    detailView.setUser(new user_1.User());
                    _this.observable.view = detailView;
                }
                else if (hash.indexOf("#/update/") === 0) {
                    var userid = parseInt(hash.split("/").pop());
                    var user = _this.listView.getById(userid);
                    detailView.setUser(user);
                    _this.observable.view = detailView;
                }
                else {
                    _this.observable.view = listView;
                }
            });
            // création de quelques tests
            this.listView.add({
                id: this.id++,
                firstName: 'Ryan',
                lastName: 'Bob',
                birthdate: new Date(1989, 5, 10),
                login: 'ryan.bob',
                password: '1234',
                actif: true
            });
            this.listView.add({
                id: this.id++,
                firstName: 'Michel',
                lastName: 'Morgan',
                birthdate: new Date(1982, 9, 17),
                login: 'mich',
                password: '4321',
                actif: true
            });
        }
        Startup = __decorate([
            artiste_1.View({
                template: "dist/template/layout.html",
                binding: {
                    "this": function (starter) { return artiste_1.view(function () { return starter.observable.view; }); }
                }
            }),
            __metadata("design:paramtypes", [artiste_1.IObservablizer,
                artiste_1.INotifier,
                artiste_1.IRouter,
                list_1.IList,
                detail_1.IDetail])
        ], Startup);
        return Startup;
    }());
    exports.Startup = Startup;
});
