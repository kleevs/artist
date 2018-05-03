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
    class IProvider {
    }
    exports.IProvider = IProvider;
    class IConfig {
    }
    exports.IConfig = IConfig;
    class Provider extends IProvider {
        constructor(_config) {
            super();
            this._config = _config;
            this._register = [];
        }
        create(data) {
            var param = [];
            data && data.parameters && data.parameters.forEach((key) => {
                param.push(this.getService(key));
            });
            return data.value ?
                (param.length <= 0 ?
                    new data.value() :
                    new (data.value.bind.apply(data.value, [null].concat(param)))()) : undefined;
        }
        createService(key, parameters) {
            let instance;
            let service = this._config.getService(key);
            service = service || { value: key, parameters: [] };
            parameters && (service.parameters = parameters);
            instance = this.create(service);
            service && service.initialize && service.initialize(instance);
            return instance;
        }
        getService(key) {
            var result = this._register.filter((item) => item.key === key).map((item) => item.value)[0];
            var registerable = !result && this._config.getService(key).registerable;
            result = result || this.createService(key);
            registerable && this._register.push({ key: key, value: result });
            return result;
        }
    }
    class Config extends IConfig {
        constructor() {
            super();
            this._register = [];
        }
        addService(key, value, options) {
            this._register.unshift({
                key: key,
                value: value,
                parameters: options.parameters,
                registerable: options.registerable,
                initialize: options.initialize,
                test: options.test
            });
        }
        getService(key) {
            return this._register
                .filter((item) => item.key === key)
                .filter(item => !item.test || item.test(item.value))
                .map((item) => {
                return {
                    value: item.value,
                    parameters: item.parameters,
                    registerable: item.registerable,
                    initialize: item.initialize
                };
            })[0];
        }
    }
    class DependencyInjector {
        constructor() {
            this._config = new Config();
            this._provider = new Provider(this._config);
        }
        getConfig() { return this._config; }
        getProvider() { return this._provider; }
        getDecorator() {
            return (options) => {
                var res = (target, metadata) => {
                    this._config.addService(options.key, target, {
                        parameters: metadata && metadata["design:paramtypes"] || [],
                        registerable: options.registerable || options.registerable === undefined,
                        initialize: options.initialize,
                        test: options.test
                    });
                };
                return res;
            };
        }
    }
    exports.DependencyInjector = DependencyInjector;
});