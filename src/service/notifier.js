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
    const service_1 = require("../core/service");
    class INotifier {
    }
    exports.INotifier = INotifier;
    class Event {
        constructor(key) {
            this.key = key;
        }
    }
    exports.Event = Event;
    ;
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
        forEvent(event) {
            return {
                listen: (obj, callback) => this.listen(obj, event.key, callback),
                notify: (obj, data) => this.notify(obj, event.key, data)
            };
        }
        register(obj, key) {
            obj.__notifier__id__ = obj.__notifier__id__ || [new Date().getTime(), Math.random() * 100].join("");
            return this._callbacks[obj.__notifier__id__ + "_" + key] = this._callbacks[obj.__notifier__id__ + "_" + key] || [];
        }
    };
    Notifier = __decorate([
        service_1.Service({
            key: INotifier
        })
    ], Notifier);
    exports.Notifier = Notifier;
});
