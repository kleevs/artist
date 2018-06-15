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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../core/service", "viewProvider", "../lib/dom/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var service_1 = require("../core/service");
    var viewProvider_1 = require("viewProvider");
    var index_1 = require("../lib/dom/index");
    var NEvent = /** @class */ (function () {
        function NEvent(key) {
            this.key = key;
        }
        return NEvent;
    }());
    exports.Event = NEvent;
    ;
    var IEventManager = /** @class */ (function () {
        function IEventManager() {
        }
        return IEventManager;
    }());
    exports.IEventManager = IEventManager;
    var EventManager = /** @class */ (function (_super) {
        __extends(EventManager, _super);
        function EventManager(viewProvider) {
            var _this = _super.call(this) || this;
            _this.viewProvider = viewProvider;
            return _this;
        }
        EventManager.prototype.forEvent = function (event) {
            var _this = this;
            return {
                listen: function (context, callback) {
                    var fn;
                    setTimeout(function () {
                        _this.viewProvider.getNode(context).then(function (element) {
                            element && element.addEventListener(event.key, fn = function (e) {
                                var emitter = _this.viewProvider.getView(e.target);
                                var stopPropagation = emitter && callback(emitter, e.data);
                                stopPropagation && e.stopPropagation();
                            });
                        });
                    });
                    return {
                        stop: function (context) {
                            setTimeout(function () {
                                _this.viewProvider.getNode(context).then(function (element) {
                                    element && element.removeEventListener(event.key, fn);
                                });
                            });
                        }
                    };
                },
                notify: function (context, param) {
                    if (context) {
                        _this.viewProvider.getNode(context).then(function (e) {
                            index_1.dispatchEvent(e, event.key, param);
                        });
                    }
                }
            };
        };
        EventManager = __decorate([
            service_1.Service({
                key: IEventManager
            }),
            __metadata("design:paramtypes", [viewProvider_1.IViewProvider])
        ], EventManager);
        return EventManager;
    }(IEventManager));
    exports.EventManager = EventManager;
});
