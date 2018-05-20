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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../reflection/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    require("../reflection/index");
    var IProvider = /** @class */ (function () {
        function IProvider() {
        }
        return IProvider;
    }());
    exports.IProvider = IProvider;
    var IConfig = /** @class */ (function () {
        function IConfig() {
        }
        return IConfig;
    }());
    exports.IConfig = IConfig;
    var Provider = /** @class */ (function (_super) {
        __extends(Provider, _super);
        function Provider(_config) {
            var _this = _super.call(this) || this;
            _this._config = _config;
            _this._register = [];
            return _this;
        }
        Provider.prototype.create = function (data) {
            var _this = this;
            var param = [];
            data && data.parameters && data.parameters.forEach(function (key) {
                param.push(_this.getService(key));
            });
            return data.value ?
                (param.length <= 0 ?
                    new data.value() :
                    new (data.value.bind.apply(data.value, [null].concat(param)))()) : undefined;
        };
        Provider.prototype.createService = function (key, parameters) {
            var instance;
            var service = this._config.getService(key);
            service = service || { value: key, parameters: [] };
            parameters && (service.parameters = parameters);
            instance = this.create(service);
            service && service.initialize && service.initialize(instance);
            return instance;
        };
        Provider.prototype.getService = function (key) {
            var result = this._register.filter(function (item) { return item.key === key; }).map(function (item) { return item.value; })[0];
            var registerable = !result && this._config.getService(key).registerable;
            result = result || this.createService(key);
            registerable && this._register.push({ key: key, value: result });
            return result;
        };
        return Provider;
    }(IProvider));
    var Config = /** @class */ (function (_super) {
        __extends(Config, _super);
        function Config() {
            var _this = _super.call(this) || this;
            _this._register = [];
            return _this;
        }
        Config.prototype.addService = function (key, value, options) {
            this._register.unshift({
                key: key,
                value: value,
                parameters: options.parameters,
                registerable: options.registerable,
                initialize: options.initialize,
                test: options.test
            });
        };
        Config.prototype.getService = function (key) {
            return this._register
                .filter(function (item) { return item.key === key; })
                .filter(function (item) { return !item.test || item.test(item.value); })
                .map(function (item) {
                return {
                    value: item.value,
                    parameters: item.parameters,
                    registerable: item.registerable,
                    initialize: item.initialize
                };
            })[0];
        };
        return Config;
    }(IConfig));
    var DependencyInjector = /** @class */ (function () {
        function DependencyInjector() {
            this._config = new Config();
            this._provider = new Provider(this._config);
        }
        DependencyInjector.prototype.getConfig = function () { return this._config; };
        DependencyInjector.prototype.getProvider = function () { return this._provider; };
        DependencyInjector.prototype.getDecorator = function () {
            var _this = this;
            return function (options) {
                var res = function (target, metadata) {
                    _this._config.addService(options.key, target, {
                        parameters: metadata && metadata["design:paramtypes"] || [],
                        registerable: options.registerable || options.registerable === undefined,
                        initialize: options.initialize,
                        test: options.test
                    });
                };
                return res;
            };
        };
        return DependencyInjector;
    }());
    exports.DependencyInjector = DependencyInjector;
});
