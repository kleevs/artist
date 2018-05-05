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
    const service_1 = require("../core/service");
    const index_1 = require("../lib/observable/index");
    function foreach(item, callback) {
        let i;
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
    class IObservablizer {
    }
    exports.IObservablizer = IObservablizer;
    let Observablizer = class Observablizer extends IObservablizer {
        convert(value) {
            var res = value && Object.create(value) || undefined;
            value && foreach(value, (item, key) => {
                var descriptor = Object.getOwnPropertyDescriptor(value, key);
                var observable;
                !descriptor.get && !descriptor.set &&
                    (() => {
                        observable = index_1.observable({});
                        descriptor.get = () => observable().value;
                        descriptor.set = (v) => {
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
        }
    };
    Observablizer = __decorate([
        service_1.Service({
            key: IObservablizer
        })
    ], Observablizer);
    exports.Observablizer = Observablizer;
});
