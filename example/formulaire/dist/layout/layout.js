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
define(["require", "exports", "artist", "../view/form", "../view/detail", "../view/list", "../view/saved"], function (require, exports, artist_1, form_1, detail_1, list_1, saved_1) {
    "use strict";
    exports.__esModule = true;
    var ILayout = /** @class */ (function () {
        function ILayout() {
        }
        return ILayout;
    }());
    exports.ILayout = ILayout;
    var LayoutView = /** @class */ (function (_super) {
        __extends(LayoutView, _super);
        function LayoutView(viewProvider, observalizer, notifier) {
            var _this = _super.call(this) || this;
            _this.observable = observalizer.convert({
                list: viewProvider.newInstance(list_1.IList),
                saved: viewProvider.newInstance(saved_1.ISaved),
                form: viewProvider.newInstance(form_1.IForm),
                detail: viewProvider.newInstance(detail_1.IDetail)
            });
            notifier.forEvent(form_1.IForm.AddUserEvent).listen(_this.observable.form, function (usr) { return _this.observable.list.add(usr); });
            notifier.forEvent(list_1.IList.SaveUsersEvent).listen(_this.observable.list, function (usrs) { return _this.observable.saved.save(usrs); });
            notifier.forEvent(list_1.IList.SelectUserEvent).listen(_this.observable.list, function (usr) { return _this.observable.detail.select(usr); });
            return _this;
        }
        LayoutView = __decorate([
            artist_1.View({
                template: "dist/tmpl/layout.html",
                binding: {
                    "[form]": function (layout) { return artist_1.view(function () { return layout.observable.form; }); },
                    "[detail]": function (layout) { return artist_1.view(function () { return layout.observable.detail; }); },
                    "[list]": function (layout) { return artist_1.view(function () { return layout.observable.list; }); },
                    "[saved]": function (layout) { return artist_1.view(function () { return layout.observable.saved; }); }
                }
            }),
            __metadata("design:paramtypes", [artist_1.IViewProvider, artist_1.IObservablizer, artist_1.INotifier])
        ], LayoutView);
        return LayoutView;
    }(ILayout));
});
