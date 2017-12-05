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
        define(["require", "exports", "node_modules/observable/src/index", "node_modules/dependency-injection/src/index", "./mixin"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const index_1 = require("node_modules/observable/src/index");
    const index_2 = require("node_modules/dependency-injection/src/index");
    const mixin_1 = require("./mixin");
    var injector = new index_2.DependencyInjector();
    exports.config = injector.getConfig();
    exports.provider = injector.getProvider();
    exports.Service = injector.getDecorator();
    class IObservablizer {
    }
    exports.IObservablizer = IObservablizer;
    class INotifier {
    }
    exports.INotifier = INotifier;
    let Observablizer = class Observablizer extends IObservablizer {
        convert(value) {
            var res = value && Object.create(value) || undefined;
            value && mixin_1.foreach(value, (item, key) => {
                var descriptor = Object.getOwnPropertyDescriptor(value, key);
                var observable;
                !descriptor.get && !descriptor.set &&
                    (() => {
                        observable = index_1.object();
                        descriptor.get = () => observable();
                        descriptor.set = (v) => {
                            v instanceof Array && (v.push = function () {
                                var res = Array.prototype.push.apply(this, arguments);
                                observable(this);
                                return res;
                            });
                            observable(v);
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
        exports.Service({
            interface: IObservablizer
        })
    ], Observablizer);
    let Notifier = class Notifier extends INotifier {
        constructor() {
            super(...arguments);
            this._callbacks = {};
        }
        notify(obj, key, data) {
            var callbacks = this.register(obj, key);
            callbacks && callbacks.forEach((callback) => {
                callback(data);
            });
        }
        listen(obj, key, callback) {
            var callbacks = this.register(obj, key);
            callbacks.push(callback);
        }
        register(obj, key) {
            obj.__notifier__id__ = obj.__notifier__id__ || [new Date().getTime(), Math.random() * 100].join("");
            return this._callbacks[obj.__notifier__id__ + "_" + key] = this._callbacks[obj.__notifier__id__ + "_" + key] || [];
        }
    };
    Notifier = __decorate([
        exports.Service({
            interface: INotifier
        })
    ], Notifier);
});
//# sourceMappingURL=service.js.map