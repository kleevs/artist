var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "node_modules/artist/dist/artist"], function (require, exports, artist_1) {
    "use strict";
    exports.__esModule = true;
    var Startup = /** @class */ (function () {
        function Startup() {
        }
        Startup = __decorate([
            artist_1.View({
                template: "dist/template/layout.html",
                binding: {}
            }),
            __metadata("design:paramtypes", [])
        ], Startup);
        return Startup;
    }());
    exports.Startup = Startup;
});
