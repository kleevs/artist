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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../core/service"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var service_1 = require("../core/service");
    /** @description Interface du service gérant la communication entre vue.
     */
    var INotifier = /** @class */ (function () {
        function INotifier() {
        }
        return INotifier;
    }());
    exports.INotifier = INotifier;
    /** @description Classe définissant les évènements à manipuler pour la communication entre vue.
     */
    var Event = /** @class */ (function () {
        function Event(key) {
            this.key = key;
        }
        return Event;
    }());
    exports.Event = Event;
    ;
    var Notifier = /** @class */ (function (_super) {
        __extends(Notifier, _super);
        function Notifier() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._callbacks = {};
            return _this;
        }
        Notifier.prototype.notify = function (obj, key, data) {
            var callbacks = this.register(obj, key);
            callbacks && callbacks.forEach(function (callback) {
                callback(data);
            });
        };
        Notifier.prototype.listen = function (obj, key, callback) {
            var callbacks = this.register(obj, key);
            callbacks.push(callback);
            return {
                stop: function () {
                    var index = callbacks.indexOf(callback);
                    if (index > -1) {
                        callbacks.splice(index, 1);
                    }
                }
            };
        };
        Notifier.prototype.forEvent = function (event) {
            var _this = this;
            return {
                listen: function (obj, callback) { return _this.listen(obj, event.key, callback); },
                notify: function (obj, data) { return _this.notify(obj, event.key, data); }
            };
        };
        Notifier.prototype.register = function (obj, key) {
            obj.__notifier__id__ = obj.__notifier__id__ || [new Date().getTime(), Math.random() * 100].join("");
            return this._callbacks[obj.__notifier__id__ + "_" + key] = this._callbacks[obj.__notifier__id__ + "_" + key] || [];
        };
        Notifier = __decorate([
            service_1.Service({
                key: INotifier
            })
        ], Notifier);
        return Notifier;
    }(INotifier));
    exports.Notifier = Notifier;
});
