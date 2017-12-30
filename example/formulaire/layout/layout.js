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
        define(["require", "exports", "../../../src/index", "../view/form", "../view/detail", "../view/list", "../view/saved"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const index_1 = require("../../../src/index");
    const form_1 = require("../view/form");
    const detail_1 = require("../view/detail");
    const list_1 = require("../view/list");
    const saved_1 = require("../view/saved");
    class ILayout {
    }
    exports.ILayout = ILayout;
    let LayoutView = class LayoutView extends ILayout {
        constructor(value) {
            super();
            this.observable = value;
        }
    };
    LayoutView = __decorate([
        index_1.View({
            template: "formulaire/tmpl/layout.html",
            binding: {
                "[form]": (layout) => index_1.view(() => layout.observable.form),
                "[detail]": (layout) => index_1.view(() => layout.observable.detail),
                "[list]": (layout) => index_1.view(() => layout.observable.list),
                "[saved]": (layout) => index_1.view(() => layout.observable.saved),
            }
        }),
        __metadata("design:paramtypes", [Object])
    ], LayoutView);
    let LayoutService = class LayoutService extends LayoutView {
        constructor(viewProvider, observalizer, notifier) {
            super(observalizer.convert({
                list: viewProvider.newInstance(list_1.IList),
                saved: viewProvider.newInstance(saved_1.ISaved),
                form: viewProvider.newInstance(form_1.IForm),
                detail: viewProvider.newInstance(detail_1.IDetail)
            }));
            notifier.listen(this.observable.form, form_1.IForm.AddUserEvent, (usr) => this.observable.list.add(usr));
            notifier.listen(this.observable.list, list_1.IList.SaveUsersEvent, (usrs) => this.observable.saved.save(usrs));
            notifier.listen(this.observable.list, list_1.IList.SelectUserEvent, (usr) => this.observable.detail.select(usr));
        }
    };
    LayoutService = __decorate([
        index_1.Service({
            interface: LayoutView
        }),
        __metadata("design:paramtypes", [index_1.IViewProvider, index_1.IObservablizer, index_1.INotifier])
    ], LayoutService);
});
//# sourceMappingURL=layout.js.map