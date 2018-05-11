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
define(["require", "exports", "artiste", "node_modules/jquery/dist/jquery"], function (require, exports, artiste_1, $) {
    "use strict";
    exports.__esModule = true;
    var ISaved = /** @class */ (function () {
        function ISaved() {
        }
        return ISaved;
    }());
    exports.ISaved = ISaved;
    var Saved = /** @class */ (function (_super) {
        __extends(Saved, _super);
        function Saved(observalizer) {
            var _this = _super.call(this) || this;
            _this.observable = observalizer.convert({
                users: []
            });
            return _this;
        }
        Saved.prototype.save = function (users) {
            this.observable.users = users;
        };
        Saved = __decorate([
            artiste_1.View({
                template: "dist/tmpl/saved.html",
                binding: {
                    "[panel-title]": function (view) { return artiste_1.text(function () { return "Saved"; }); },
                    "table tbody": function (view) { return artiste_1.each(function () {
                        return $.map(view.observable.users, function (row) {
                            return {
                                "[first]": artiste_1.text(function () { return row.first; }),
                                "[last]": artiste_1.text(function () { return row.last; }),
                                "[full]": artiste_1.text(function () { return $.grep([row.first, row.last], function (item) { return !!item; }).join(" "); }),
                                "[age]": artiste_1.text(function () { return row.age; })
                            };
                        });
                    }); }
                }
            }),
            __metadata("design:paramtypes", [typeof (_a = typeof artiste_1.IObservablizer !== "undefined" && artiste_1.IObservablizer) === "function" && _a || Object])
        ], Saved);
        return Saved;
        var _a;
    }(ISaved));
});
