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
        define(["require", "exports", "../core/service", "../lib/observable/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var service_1 = require("../core/service");
    var index_1 = require("../lib/observable/index");
    function foreach(item, callback) {
        var i;
        if (item instanceof Array) {
            for (i = 0; i < item.length; i++) {
                callback(item[i], i);
            }
        }
        else {
            for (i in item) {
                callback(item[i], i);
            }
        }
    }
    /** @description Interface du service gérant la création d'objet observable.
     */
    var IObservablizer = /** @class */ (function () {
        function IObservablizer() {
        }
        return IObservablizer;
    }());
    exports.IObservablizer = IObservablizer;
    var Observablizer = /** @class */ (function (_super) {
        __extends(Observablizer, _super);
        function Observablizer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Observablizer.prototype.convert = function (value) {
            var res = value && Object.create(value) || undefined;
            value && foreach(value, function (item, key) {
                var descriptor = Object.getOwnPropertyDescriptor(value, key);
                var observable;
                !descriptor.get && !descriptor.set &&
                    (function () {
                        observable = index_1.observable({});
                        descriptor.get = function () { return observable().value; };
                        descriptor.set = function (v) {
                            v instanceof Array && (v.push = function () {
                                var res = Array.prototype.push.apply(this, arguments);
                                observable({ value: this });
                                return res;
                            });
                            v instanceof Array && (v.splice = function () {
                                var res = Array.prototype.splice.apply(this, arguments);
                                observable({ value: this });
                                return res;
                            });
                            observable({ value: v });
                        };
                        delete descriptor.value;
                        delete descriptor.writable;
                        Object.defineProperty(res, key, descriptor);
                        res[key] = item;
                    })();
            });
            return res;
        };
        Observablizer = __decorate([
            service_1.Service({
                key: IObservablizer
            })
        ], Observablizer);
        return Observablizer;
    }(IObservablizer));
    exports.Observablizer = Observablizer;
});
