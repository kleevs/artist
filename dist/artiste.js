(function() {
var __REQUIRE__ = {};
var __MODE__ = typeof __META__ !== "undefined" && (__META__.MODE === "AMD" && "AMD" || __META__.MODE === "NODE" && "NODE") || undefined;
var __META__ = {}; 
__META__.MODE = __MODE__;
__MODE__ = undefined;
(function (factory, context) {
	if (__META__.MODE === "NODE" || typeof module === "object" && typeof module.exports === "object") {
		__META__.MODE = "NODE";
		module.exports = factory(context);
	} else if (__META__.MODE === "AMD" || typeof define === "function" && define.amd) {
		__META__.MODE = "AMD";
		var moduleRequired = __REQUIRE__ = {};
		var required = [];
		define([], function () { 
			Array.prototype.forEach.call(arguments, function(res, i) {
				moduleRequired[required[i]] = res;
			}); 
			
			return factory(context); 
		});
	} else {
		__META__.MODE = "";
		var m = factory(context);
		window.Artiste = m;
	}

})(function (context) {
	var throw_exception = function (msg) { throw msg; };
	
	__REQUIRE__ = undefined;
	throw_exception = undefined;
	context = undefined;
	var define = (function() {
		var paths = [{ test: /^\/?(node_modules\/*)/, result: "/$1" }];
		var modules = {};
		var normalize = function (path) {
			var tmp = path.split("/");
			var i = 0;
			var last = -1;
			while (i <tmp.length) {
				if (tmp[i] === "..") {
					tmp[i] = ".";
					last > 0 && (tmp[last] = ".");
					last-=2;
				} else if (tmp[i] === ".") {
					last--;
				}
				last++;
				i++;
			}

			return tmp.filter(function(_) { return _ !== "."; }).join("/");
		}
		var getUri = function(uri, context) {
			paths.some(function(path) {
				if (uri.match(path.test)) {
					uri = uri.replace(path.test, path.result);
					return true;
				}
			});
			var href = (uri && !uri.match(/^\//) && context && context.replace(/(\/?)[^\/]*$/, '$1') || '') + uri;
			href = href.replace(/^\/?(.*)$/, '/$1.js');
			href = href.replace(/\\/gi, "/");
			href = normalize(href);
			return href.replace(/^\//, '');
		}

		var define = function (id, dependencies, factory) {
			return modules[id] = factory.apply(null, dependencies.map(function (d) { 
				if (d !== "exports" && d !== "require") {
					return modules[getUri(d, id)]; 
				}
				
				if (d === "exports") {
					return modules[id] = {};
				}
				
				if (d === "require") {
					return function (k) { var uri = getUri(k, id); return modules[uri]; };
				}
			})) || modules[id];
		}
		define.amd = {};
		return define; 
	})();

	if (typeof Object.assign != 'function') {
	    // Must be writable: true, enumerable: false, configurable: true
	    Object.defineProperty(Object, "assign", {
	        value: function assign(target, varArgs) {
	            'use strict';
	            if (target == null) {
	                throw new TypeError('Cannot convert undefined or null to object');
	            }
	            var to = Object(target);
	            for (var index = 1; index < arguments.length; index++) {
	                var nextSource = arguments[index];
	                if (nextSource != null) {
	                    for (var nextKey in nextSource) {
	                        // Avoid bugs when hasOwnProperty is shadowed
	                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
	                            to[nextKey] = nextSource[nextKey];
	                        }
	                    }
	                }
	            }
	            return to;
	        },
	        writable: true,
	        configurable: true
	    });
	}
	
	// ECMA-262, Edition 5, 15.4.4.18
	// Référence: http://es5.github.io/#x15.4.4.18
	if (!Array.prototype.forEach) {
	    Array.prototype.forEach = function (callback /*, thisArg*/) {
	        var T, k;
	        if (this == null) {
	            throw new TypeError(' this vaut null ou n est pas défini');
	        }
	        // 1. Soit O le résultat de l'appel à ToObject
	        //    auquel on a passé |this| en argument.
	        var O = Object(this);
	        // 2. Soit lenValue le résultat de l'appel de la méthode 
	        //    interne Get sur O avec l'argument "length".
	        // 3. Soit len la valeur ToUint32(lenValue).
	        var len = O.length >>> 0;
	        // 4. Si IsCallable(callback) est false, on lève une TypeError.
	        // Voir : http://es5.github.com/#x9.11
	        if (typeof callback !== "function") {
	            throw new TypeError(callback + ' n est pas une fonction');
	        }
	        // 5. Si thisArg a été fourni, soit T ce thisArg ;
	        //    sinon soit T égal à undefined.
	        if (arguments.length > 1) {
	            T = arguments[1];
	        }
	        // 6. Soit k égal à 0
	        k = 0;
	        // 7. On répète tant que k < len
	        while (k < len) {
	            var kValue;
	            // a. Soit Pk égal ToString(k).
	            //   (implicite pour l'opérande gauche de in)
	            // b. Soit kPresent le résultat de l'appel de la 
	            //    méthode interne HasProperty de O avec l'argument Pk.
	            //    Cette étape peut être combinée avec c
	            // c. Si kPresent vaut true, alors
	            if (k in O) {
	                // i. Soit kValue le résultat de l'appel de la 
	                //    méthode interne Get de O avec l'argument Pk.
	                kValue = O[k];
	                // ii. On appelle la méthode interne Call de callback 
	                //     avec T comme valeur this et la liste des arguments
	                //     qui contient kValue, k, et O.
	                callback.call(T, kValue, k, O);
	            }
	            // d. On augmente k de 1.
	            k++;
	        }
	        // 8. on renvoie undefined
	    };
	}
	if (!NodeList.prototype.forEach) {
	    NodeList.prototype.forEach = function (callback /*, thisArg*/) {
	        var T, k;
	        if (this == null) {
	            throw new TypeError(' this vaut null ou n est pas défini');
	        }
	        // 1. Soit O le résultat de l'appel à ToObject
	        //    auquel on a passé |this| en argument.
	        var O = Object(this);
	        // 2. Soit lenValue le résultat de l'appel de la méthode 
	        //    interne Get sur O avec l'argument "length".
	        // 3. Soit len la valeur ToUint32(lenValue).
	        var len = O.length >>> 0;
	        // 4. Si IsCallable(callback) est false, on lève une TypeError.
	        // Voir : http://es5.github.com/#x9.11
	        if (typeof callback !== "function") {
	            throw new TypeError(callback + ' n est pas une fonction');
	        }
	        // 5. Si thisArg a été fourni, soit T ce thisArg ;
	        //    sinon soit T égal à undefined.
	        if (arguments.length > 1) {
	            T = arguments[1];
	        }
	        // 6. Soit k égal à 0
	        k = 0;
	        // 7. On répète tant que k < len
	        while (k < len) {
	            var kValue;
	            // a. Soit Pk égal ToString(k).
	            //   (implicite pour l'opérande gauche de in)
	            // b. Soit kPresent le résultat de l'appel de la 
	            //    méthode interne HasProperty de O avec l'argument Pk.
	            //    Cette étape peut être combinée avec c
	            // c. Si kPresent vaut true, alors
	            if (k in O) {
	                // i. Soit kValue le résultat de l'appel de la 
	                //    méthode interne Get de O avec l'argument Pk.
	                kValue = O[k];
	                // ii. On appelle la méthode interne Call de callback 
	                //     avec T comme valeur this et la liste des arguments
	                //     qui contient kValue, k, et O.
	                callback.call(T, kValue, k, O);
	            }
	            // d. On augmente k de 1.
	            k++;
	        }
	        // 8. on renvoie undefined
	    };
	}
	
	// Production steps / ECMA-262, Edition 5, 15.4.4.19
	// Référence : https://es5.github.io/#x15.4.4.19
	if (!Array.prototype.map) {
	    Array.prototype.map = function (callback /*, thisArg*/) {
	        var T, A, k;
	        if (this == null) {
	            throw new TypeError(' this est null ou non défini');
	        }
	        // 1. Soit O le résultat de l'appel ToObject avec |this| 
	        //    comme argument.
	        var O = Object(this);
	        // 2. Soit lenValue le résultat de l'appel de la méthode interne
	        //    Get de O avec l'argument "length".
	        // 3. Soit len égal à ToUint32(lenValue).
	        var len = O.length >>> 0;
	        // 4. Si IsCallable(callback) vaut false, on renvoie une TypeError
	        // Voir : https://es5.github.com/#x9.11
	        if (typeof callback !== 'function') {
	            throw new TypeError(callback + ' n est pas une fonction');
	        }
	        // 5. Si thisArg a été utilisé, on définit T avec thisArg
	        //    sinon T vaudra undefined.
	        if (arguments.length > 1) {
	            T = arguments[1];
	        }
	        // 6. Soit A un nouveau tableau créé tel
	        //    qu'avec l'expression new Array(len) 
	        //    où Array est le constructeur natif standard
	        A = new Array(len);
	        // 7. Soit k égal à 0
	        k = 0;
	        // 8. On répète tant que k < len
	        while (k < len) {
	            var kValue, mappedValue;
	            // a. Soit Pk égal à ToString(k).
	            //    (implicite pour l'opérande gauche de in)
	            // b. Soit kPresent le résultat de l'appel à la méthode
	            //    interne de O HasProperty appelée avec l'argument 
	            //     Pk.
	            //    Cette étape peut être combinée avec c
	            // c. Si kPresent vaut true, alors
	            if (k in O) {
	                // i. Soit kValue le résultat de l'appel de la méthode
	                //    interne Get de O avec l'argument Pk.
	                kValue = O[k];
	                // ii. Soit mappedValue le résultat de l'appel de la 
	                //     méthode interne Call de callback avec T comme première
	                //     valeur et la liste des arguments kValue, k, et O.
	                mappedValue = callback.call(T, kValue, k, O);
	                // iii. On appelle la méthode intnerne DefineOwnProperty de A
	                // avec les arguments Pk, Property Descriptor
	                // { Value: mappedValue,
	                //   Writable: true,
	                //   Enumerable: true,
	                //   Configurable: true },
	                // et false.
	                // Pour les navigateurs qui supportent Object.defineProperty
	                // on pourra utiliser :
	                // Object.defineProperty(A, k, {
	                //   value: mappedValue,
	                //   writable: true,
	                //   enumerable: true,
	                //   configurable: true
	                // });
	                // Pour un meilleur support, on utilisera :
	                A[k] = mappedValue;
	            }
	            // d. On augmente k de 1.
	            k++;
	        }
	        // 9. On renvoie A
	        return A;
	    };
	}
	
	var CustomPromise = /** @class */ (function () {
	    function CustomPromise(executor) {
	        var _this = this;
	        this._nextFulfilled = [];
	        this._nextRejected = [];
	        this._isRejected = undefined;
	        executor(function (value) {
	            _this._value = value;
	            _this._isRejected = false;
	            var resolve = function (value) { return setTimeout(function () {
	                _this._nextFulfilled.map(function (next) {
	                    next.exec(value);
	                });
	            }); };
	            if (value && value instanceof CustomPromise) {
	                value.then(function (v) { return resolve(v); });
	            }
	            else {
	                resolve(value);
	            }
	        }, function (reason) {
	            var rejected = _this.getRejected();
	            _this._value = reason;
	            _this._isRejected = true;
	            var resolve = function (reason) { return setTimeout(function () {
	                rejected.map(function (next) {
	                    next(reason);
	                });
	            }); };
	            if (reason && reason instanceof CustomPromise) {
	                reason.then(function (v) { return resolve(v); });
	            }
	            else {
	                resolve(reason);
	            }
	        });
	    }
	    CustomPromise.prototype.getRejected = function () {
	        var res = [];
	        return this._nextFulfilled.forEach(function (p) {
	            res = res.concat(p.promise._nextRejected.map(function (f) { return f.exec; }));
	            res = res.length > 0 && res || res.concat(p.promise.getRejected());
	        }) || res;
	    };
	    CustomPromise.prototype.then = function (onfulfilled, onrejected) {
	        var exec, next = new CustomPromise(function (resolve, reject) {
	            exec = function (value) {
	                var rejected = next.getRejected();
	                var res;
	                if (onfulfilled) {
	                    if (rejected.length > 0) {
	                        try {
	                            res = onfulfilled(value);
	                        }
	                        catch (e) {
	                            rejected.map(function (f) { return f(e); });
	                            return;
	                        }
	                    }
	                    else {
	                        res = onfulfilled(value);
	                    }
	                    resolve(res);
	                }
	            };
	        });
	        if (this._isRejected === false) {
	            exec(this._value);
	        }
	        else if (this._isRejected === undefined) {
	            this._nextFulfilled.push({ exec: exec, promise: next });
	        }
	        return next;
	    };
	    CustomPromise.prototype.catch = function (onrejected) {
	        var exec, next = new CustomPromise(function (resolve, reject) {
	            exec = function (reason) {
	                var rejected = next.getRejected();
	                var res;
	                if (onrejected) {
	                    if (rejected.length > 0) {
	                        try {
	                            res = onrejected(reason);
	                        }
	                        catch (e) {
	                            rejected.map(function (f) { return f(e); });
	                            return;
	                        }
	                    }
	                    else {
	                        res = onrejected(reason);
	                    }
	                    resolve(res);
	                }
	            };
	        });
	        if (this._isRejected === true) {
	            exec(this._value);
	        }
	        else if (this._isRejected === undefined) {
	            this._nextRejected.push({ exec: exec, promise: next });
	        }
	        return next;
	    };
	    CustomPromise.all = function (values) {
	        var promises = values;
	        return new CustomPromise(function (success) {
	            var i = 0, length = promises ? promises.length : 0, res = [];
	            for (var j = 0; j < length; j++) {
	                res.push(null);
	            }
	            if (!length) {
	                success(res);
	                return;
	            }
	            promises.forEach(function (promise, index) {
	                (promise instanceof CustomPromise && promise || CustomPromise.resolve(promise)).then(function (value) {
	                    i++;
	                    res[index] = value;
	                    if (i >= length) {
	                        success(res);
	                    }
	                });
	            });
	        });
	    };
	    CustomPromise.resolve = function (value) {
	        return new CustomPromise(function (resolve) { resolve(value); });
	    };
	    return CustomPromise;
	}());
	window.Promise = window.Promise || CustomPromise;
	
	(function (factory) {
	    if (typeof module === "object" && typeof module.exports === "object") {
	        var v = factory(require, exports);
	        if (v !== undefined) module.exports = v;
	    }
	    else if (typeof define === "function" && define.amd) {
	        define('src/lib/reflection/index.js', ["require", "exports"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    var context = window;
	    context.Reflect = context.Reflect || {};
	    context.Reflect.metadata = function (k, v) {
	        return function (target, metadata) {
	            metadata[k] = v;
	        };
	    };
	    context.Reflect.decorate = function (decorators, target, key, desc) {
	        var r = key === undefined ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, metadata = {}, d;
	        for (var i = decorators.length - 1; i >= 0; i--) {
	            if (d = decorators[i]) {
	                r = (!key ? d(r, metadata) : !desc ? d(target, key, r, metadata) : d(target, key, metadata)) || r;
	            }
	        }
	        return r;
	    };
	    exports.default = true;
	});
	
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
	        define('src/lib/dependency-injection/index.js', ["require", "exports", "../reflection/index"], factory);
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
	
	(function (factory) {
	    if (typeof module === "object" && typeof module.exports === "object") {
	        var v = factory(require, exports);
	        if (v !== undefined) module.exports = v;
	    }
	    else if (typeof define === "function" && define.amd) {
	        define('src/core/service.js', ["require", "exports", "../lib/dependency-injection/index"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    var index_1 = require("../lib/dependency-injection/index");
	    var injector = new index_1.DependencyInjector();
	    exports.config = injector.getConfig();
	    exports.serviceProvider = injector.getProvider();
	    exports.Service = injector.getDecorator();
	});
	
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
	        define('src/service/serviceProvider.js', ["require", "exports", "../core/service"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    var service_1 = require("../core/service");
	    /** @description Interface du service fournisseur de service.
	     */
	    var IServiceProvider = /** @class */ (function () {
	        function IServiceProvider() {
	        }
	        return IServiceProvider;
	    }());
	    exports.IServiceProvider = IServiceProvider;
	    var ServiceProvider = /** @class */ (function (_super) {
	        __extends(ServiceProvider, _super);
	        function ServiceProvider() {
	            return _super !== null && _super.apply(this, arguments) || this;
	        }
	        ServiceProvider.prototype.getService = function (type) {
	            return service_1.serviceProvider.getService(type);
	        };
	        ServiceProvider.prototype.createService = function (key, parameters) {
	            return service_1.serviceProvider.createService(key, parameters);
	        };
	        ServiceProvider = __decorate([
	            service_1.Service({
	                key: IServiceProvider
	            })
	        ], ServiceProvider);
	        return ServiceProvider;
	    }(IServiceProvider));
	    exports.ServiceProvider = ServiceProvider;
	});
	
	(function (factory) {
	    if (typeof module === "object" && typeof module.exports === "object") {
	        var v = factory(require, exports);
	        if (v !== undefined) module.exports = v;
	    }
	    else if (typeof define === "function" && define.amd) {
	        define('src/lib/observable/core.js', ["require", "exports"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
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
	    function contains(array, item) {
	        var res = false;
	        foreach(array, function (x) { res = res || item === x; });
	        return res;
	    }
	    var stack = [];
	    function push(func) {
	        stack.push({ func: func });
	    }
	    function pop() {
	        return stack.pop();
	    }
	    function peek() {
	        return stack[stack.length - 1];
	    }
	    function observable(fn) {
	        var me = this, listeners = [], defaultValue = {}, value = defaultValue;
	        return function () {
	            var observer = peek() && peek().func, firstCall = defaultValue === value;
	            if (observer && !contains(listeners, observer)) {
	                listeners.push(observer);
	            }
	            if (observer && !firstCall) {
	                return value;
	            }
	            if (value !== (value = fn.apply(me, arguments)) && !firstCall) {
	                var tmp = listeners;
	                listeners = [];
	                tmp.forEach(function (observer) { return observer(); });
	            }
	            return value;
	        };
	    }
	    exports.observable = observable;
	    function observer(fn) {
	        var me;
	        (me = function () {
	            push(me);
	            var res = fn();
	            pop();
	            return res;
	        })();
	    }
	    exports.observer = observer;
	    function blind(fn) {
	        var me;
	        (me = function () {
	            push(null);
	            var res = fn();
	            pop();
	            return res;
	        })();
	    }
	    exports.blind = blind;
	});
	
	(function (factory) {
	    if (typeof module === "object" && typeof module.exports === "object") {
	        var v = factory(require, exports);
	        if (v !== undefined) module.exports = v;
	    }
	    else if (typeof define === "function" && define.amd) {
	        define('src/lib/observable/observable.js', ["require", "exports", "./core"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    var core_1 = require("./core");
	    function create(value) {
	        var result = value;
	        var obj = core_1.observable(function () { return result; });
	        return function (value) {
	            arguments.length > 0 && (result = value);
	            obj.apply(this);
	            return result;
	        };
	    }
	    exports.create = create;
	});
	
	(function (factory) {
	    if (typeof module === "object" && typeof module.exports === "object") {
	        var v = factory(require, exports);
	        if (v !== undefined) module.exports = v;
	    }
	    else if (typeof define === "function" && define.amd) {
	        define('src/lib/observable/observer.js', ["require", "exports", "./core"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    var core_1 = require("./core");
	    function create(fn) {
	        return core_1.observer(fn);
	    }
	    exports.create = create;
	});
	
	(function (factory) {
	    if (typeof module === "object" && typeof module.exports === "object") {
	        var v = factory(require, exports);
	        if (v !== undefined) module.exports = v;
	    }
	    else if (typeof define === "function" && define.amd) {
	        define('src/lib/observable/blind.js', ["require", "exports", "./core"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    var core_1 = require("./core");
	    function create(fn) {
	        return core_1.blind(fn);
	    }
	    exports.create = create;
	});
	
	(function (factory) {
	    if (typeof module === "object" && typeof module.exports === "object") {
	        var v = factory(require, exports);
	        if (v !== undefined) module.exports = v;
	    }
	    else if (typeof define === "function" && define.amd) {
	        define('src/lib/observable/index.js', ["require", "exports", "./observable", "./observer", "./blind"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    var observable_1 = require("./observable");
	    exports.observable = observable_1.create;
	    var observer_1 = require("./observer");
	    exports.observer = observer_1.create;
	    var blind_1 = require("./blind");
	    exports.blind = blind_1.create;
	});
	
	(function (factory) {
	    if (typeof module === "object" && typeof module.exports === "object") {
	        var v = factory(require, exports);
	        if (v !== undefined) module.exports = v;
	    }
	    else if (typeof define === "function" && define.amd) {
	        define('src/lib/binder/index.js', ["require", "exports", "../observable/index"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    var index_1 = require("../observable/index");
	    var BindManager = /** @class */ (function () {
	        function BindManager(element, data) {
	            if (data === void 0) { data = undefined; }
	            this.element = element;
	            this.data = data;
	        }
	        BindManager.prototype.manage = function (callback) {
	            var _this = this;
	            if (callback instanceof Array) {
	                callback.forEach(function (c) { return _this.manage(c); });
	            }
	            else {
	                var fn = callback(this.element, this.data);
	                index_1.blind(function () { return index_1.observer(function () { return fn(); }); });
	            }
	        };
	        return BindManager;
	    }());
	    exports.BindManager = BindManager;
	});
	
	(function (factory) {
	    if (typeof module === "object" && typeof module.exports === "object") {
	        var v = factory(require, exports);
	        if (v !== undefined) module.exports = v;
	    }
	    else if (typeof define === "function" && define.amd) {
	        define('src/lib/dom/index.js', ["require", "exports"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    function createElement(html) {
	        html = html.trim();
	        var isTr = html.match(/^<tr/);
	        var isTd = html.match(/^<td/);
	        var parser = document.createElement("div");
	        if (isTr || isTd) {
	            var table = document.createElement("table");
	            parser = document.createElement("tbody");
	            table.appendChild(parser);
	            if (isTd) {
	                var parent = parser;
	                parser.appendChild(parser = document.createElement("tr"));
	            }
	        }
	        parser.innerHTML = html;
	        return parser.firstChild;
	    }
	    exports.createElement = createElement;
	    ;
	    function dispatchEvent(element, type, data) {
	        var event = typeof (Event) === 'function' && new Event(type, { bubbles: true }) ||
	            (function () {
	                var event = document.createEvent("Event");
	                event.initEvent(type, true, true);
	                return event;
	            })();
	        event.data = data;
	        element.dispatchEvent(event);
	    }
	    exports.dispatchEvent = dispatchEvent;
	});
	
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
	        define('src/service/configManager.js', ["require", "exports", "../core/service"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    var service_1 = require("../core/service");
	    var IConfigManager = /** @class */ (function () {
	        function IConfigManager() {
	        }
	        return IConfigManager;
	    }());
	    exports.IConfigManager = IConfigManager;
	    var ConfigManager = /** @class */ (function (_super) {
	        __extends(ConfigManager, _super);
	        function ConfigManager() {
	            return _super !== null && _super.apply(this, arguments) || this;
	        }
	        ConfigManager.prototype.setConfig = function (config) {
	            this._config = config;
	        };
	        ConfigManager.prototype.getConfig = function () {
	            return this._config;
	        };
	        ConfigManager = __decorate([
	            service_1.Service({
	                key: IConfigManager
	            })
	        ], ConfigManager);
	        return ConfigManager;
	    }(IConfigManager));
	    exports.ConfigManager = ConfigManager;
	});
	
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
	        define('src/service/ajax.js', ["require", "exports", "../lib/polyfills/promise", "../core/service", "../service/configManager"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    require("../lib/polyfills/promise");
	    var service_1 = require("../core/service");
	    var configManager_1 = require("../service/configManager");
	    var IAjax = /** @class */ (function () {
	        function IAjax() {
	        }
	        return IAjax;
	    }());
	    exports.IAjax = IAjax;
	    var Ajax = /** @class */ (function (_super) {
	        __extends(Ajax, _super);
	        function Ajax(configManager) {
	            var _this = _super.call(this) || this;
	            _this.configManager = configManager;
	            return _this;
	        }
	        Ajax.prototype.ajax = function (options) {
	            var _this = this;
	            return new Promise(function (resolve, reject) {
	                var xhr = _this.getXMLHttpRequest();
	                var configuration = _this.configManager.getConfig();
	                var url = options.url;
	                if (configuration && configuration.path) {
	                    configuration.path.some(function (path) {
	                        if (url.match(path.test)) {
	                            url = url.replace(path.test, path.result);
	                            return true;
	                        }
	                    });
	                }
	                xhr.open(options.method || 'GET', url, true);
	                options.headers && Object.keys(options.headers).forEach(function (key) {
	                    xhr.setRequestHeader(key, options.headers[key]);
	                });
	                xhr.send(options.data);
	                xhr.onreadystatechange = function () {
	                    if (xhr.readyState == 4) {
	                        if ((xhr.status == 200 || xhr.status == 0)) {
	                            resolve({ result: xhr.responseText, status: xhr.status });
	                        }
	                        else {
	                            reject({ status: xhr.status, result: xhr.responseText });
	                        }
	                    }
	                };
	            });
	        };
	        Ajax.prototype.getXMLHttpRequest = function () {
	            var xhr = null;
	            var context = window;
	            if (context.XMLHttpRequest || context.ActiveXObject) {
	                if (context.ActiveXObject) {
	                    try {
	                        xhr = new ActiveXObject('Msxml2.XMLHTTP');
	                    }
	                    catch (e) {
	                        xhr = new ActiveXObject('Microsoft.XMLHTTP');
	                    }
	                }
	                else {
	                    xhr = new XMLHttpRequest();
	                }
	            }
	            else {
	                alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
	                return null;
	            }
	            return xhr;
	        };
	        Ajax = __decorate([
	            service_1.Service({
	                key: IAjax
	            }),
	            __metadata("design:paramtypes", [configManager_1.IConfigManager])
	        ], Ajax);
	        return Ajax;
	    }(IAjax));
	    exports.Ajax = Ajax;
	});
	
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
	        define('src/core/view.js', ["require", "exports", "../lib/polyfills/promise", "../lib/binder/index", "../lib/dom/index", "./service", "../service/ajax"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    require("../lib/polyfills/promise");
	    var index_1 = require("../lib/binder/index");
	    var index_2 = require("../lib/dom/index");
	    var service_1 = require("./service");
	    var ajax_1 = require("../service/ajax");
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
	    /** @description Classe permettant de lier une partie du DOM à un binder
	     */
	    var BindManager = /** @class */ (function (_super) {
	        __extends(BindManager, _super);
	        function BindManager(element, data) {
	            if (data === void 0) { data = undefined; }
	            return _super.call(this, element, data) || this;
	        }
	        /** @description Applique le lien entre l'élément du DOM et le binder.
	         * @param {callback} Binder Binder à lier.
	         * @return void
	         */
	        BindManager.prototype.manage = function (callback) {
	            _super.prototype.manage.call(this, callback);
	        };
	        return BindManager;
	    }(index_1.BindManager));
	    exports.BindManager = BindManager;
	    exports.registeredView = [];
	    function View(options) {
	        return function (constructor, metadata) {
	            options = constructor.prototype.__view__option__ = Object.assign({}, constructor.prototype.__view__option__, options);
	            var viewType;
	            exports.registeredView.push(viewType = {
	                construct: constructor,
	                binding: options.binding,
	                html: new Promise(function (resolve, reject) {
	                    options.html && resolve(options.html);
	                    options.template && !options.html && (function () {
	                        service_1.serviceProvider.getService(ajax_1.IAjax).ajax({ url: "/" + options.template, method: 'GET' }).then(function (response) {
	                            response.status == "error" && (reject() || true) ||
	                                resolve(response.result);
	                        });
	                    })();
	                })
	            });
	            var key = constructor;
	            while (key && key.constructor !== key) {
	                service_1.Service({
	                    key: key,
	                    registerable: false,
	                    initialize: function (view) {
	                        var binding = viewType.binding;
	                        viewType && (view.__elt__ = viewType.html.then(function (template) {
	                            var t = index_2.createElement(template);
	                            t.setAttribute("artist-view", "true");
	                            foreach(binding, function (valueAccessor, selector) {
	                                (selector.trim() === "this" && [t] || t.querySelectorAll(selector)).forEach(function (el) {
	                                    var binder = valueAccessor(view);
	                                    var binders = binder && !(binder instanceof Array) && [binder] || binder;
	                                    binders.forEach(function (b) { return new BindManager(el, service_1.serviceProvider).manage(b); });
	                                });
	                            });
	                            view && view.initialize && view.initialize();
	                            t.__view__ = view;
	                            return t;
	                        }));
	                    }
	                })(constructor, metadata);
	                key = Object.getPrototypeOf(key);
	            }
	        };
	    }
	    exports.View = View;
	});
	
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
	        define('src/service/viewProvider.js', ["require", "exports", "../lib/polyfills/promise", "../core/service", "../service/serviceProvider", "../core/view"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    require("../lib/polyfills/promise");
	    var service_1 = require("../core/service");
	    var serviceProvider_1 = require("../service/serviceProvider");
	    var view_1 = require("../core/view");
	    /** @description Interface du service fournisseur de vue.
	     */
	    var IViewProvider = /** @class */ (function () {
	        function IViewProvider() {
	        }
	        return IViewProvider;
	    }());
	    exports.IViewProvider = IViewProvider;
	    var ViewProvider = /** @class */ (function () {
	        function ViewProvider(_serviceProvider) {
	            this._serviceProvider = _serviceProvider;
	        }
	        ViewProvider.prototype.newInstance = function (type, arg) {
	            var viewType = type && view_1.registeredView.filter(function (view) { return (view.construct.prototype instanceof type) || (type === view.construct); })[0];
	            var view = viewType && (this._serviceProvider && service_1.config.getService(viewType.construct) && this._serviceProvider.createService(viewType.construct) || new viewType.construct());
	            return view;
	        };
	        ViewProvider.prototype.map = function (type) {
	            var _this = this;
	            return function (arg) { return _this.newInstance(type, arg); };
	        };
	        ViewProvider.prototype.getNode = function (view) {
	            return view && view.__elt__;
	        };
	        ViewProvider.prototype.getView = function (element) {
	            return element && element.__view__;
	        };
	        ViewProvider = __decorate([
	            service_1.Service({
	                key: IViewProvider
	            }),
	            __metadata("design:paramtypes", [serviceProvider_1.IServiceProvider])
	        ], ViewProvider);
	        return ViewProvider;
	    }());
	    exports.ViewProvider = ViewProvider;
	});
	
	(function (factory) {
	    if (typeof module === "object" && typeof module.exports === "object") {
	        var v = factory(require, exports);
	        if (v !== undefined) module.exports = v;
	    }
	    else if (typeof define === "function" && define.amd) {
	        define('src/lib/amd-loader/index.js', ["require", "exports", "../polyfills/promise"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    require("../polyfills/promise");
	    var allmodules = { "...": {} };
	    var loadedmodules = {};
	    var configuration;
	    var normalize = function (path) {
	        var tmp = path.split("/");
	        var i = 0;
	        var last = -1;
	        while (i < tmp.length) {
	            if (tmp[i] === "..") {
	                tmp[i] = ".";
	                last > 0 && (tmp[last] = ".");
	                last -= 2;
	            }
	            else if (tmp[i] === ".") {
	                last--;
	            }
	            last++;
	            i++;
	        }
	        return tmp.filter(function (_) { return _ !== "."; }).join("/");
	    };
	    var getAbsoluteUri = function (uri, context) {
	        var match = false;
	        if (configuration && configuration.path) {
	            configuration.path.some(function (path) {
	                if (uri.match(path.test)) {
	                    uri = uri.replace(path.test, path.result);
	                    return match = true;
	                }
	            });
	        }
	        var href = (!match && uri && !uri.match(/^\//) && context && context.replace(/(\/?)[^\/]*$/, '$1') || '') + uri;
	        href = href.replace(/^(.*)$/, '$1.js');
	        href = normalize(href);
	        var script = document.createElement('script');
	        script.src = href;
	        href = script.src;
	        return href;
	    };
	    function load(uri) {
	        return new Promise(function (resolve) {
	            var mod = define([uri], function (module) { resolve(module); });
	            allmodules["..."] = {};
	            mod();
	        });
	    }
	    exports.load = load;
	    function define(identifier, dependencies, modulefactory) {
	        var exp;
	        var id = "...";
	        if (arguments.length >= 3) {
	            id = arguments[0];
	            dependencies = arguments[1];
	            modulefactory = arguments[2];
	        }
	        else if (arguments.length === 2) {
	            dependencies = arguments[0];
	            modulefactory = arguments[1];
	        }
	        else if (arguments.length <= 1) {
	            dependencies = [];
	            modulefactory = arguments[0];
	        }
	        return allmodules["..."]["..."] = allmodules["..."][id] = function (context) {
	            return Promise.all(dependencies.map(function (dependency) {
	                if (dependency === "require")
	                    return function (uri) { return loadedmodules[getAbsoluteUri(uri, context)]; };
	                if (dependency === "exports")
	                    return exp = {};
	                var src = getAbsoluteUri(dependency, context);
	                return allmodules[src] = allmodules[src] || new Promise(function (resolve) {
	                    var script = document.createElement('script');
	                    script.src = src;
	                    script.async = true;
	                    document.head.appendChild(script);
	                    script.onload = script.onreadystatechange = function () {
	                        allmodules[src] = allmodules["..."]["..."];
	                        allmodules["..."] = {};
	                        allmodules[src] = allmodules[src] && allmodules[src](src).then(function (module) { resolve(loadedmodules[src] = module); return module; });
	                    };
	                });
	            })).then(function (result) {
	                var module = modulefactory.apply(this, result) || exp;
	                if (id && id !== "...") {
	                    allmodules[id] = Promise.resolve(module);
	                    loadedmodules[id] = module;
	                }
	                ;
	                return module;
	            });
	        };
	    }
	    exports.define = define;
	    define.amd = {};
	    function config(options) {
	        configuration = options;
	    }
	    exports.config = config;
	    if (typeof __META__ === "undefined" || __META__.MODE !== "AMD") {
	        var context = window;
	        context.define = define;
	        var scripts = document.getElementsByTagName('script');
	        var path = scripts[scripts.length - 1].src.split('?')[0];
	        allmodules[path] = Promise.resolve(exports);
	    }
	});
	
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
	        define('src/service/eventManager.js', ["require", "exports", "../core/service", "viewProvider", "../lib/dom/index"], factory);
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
	        define('src/service/observalizer.js', ["require", "exports", "../core/service", "../lib/observable/index"], factory);
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
	        define('src/service/moduleProvider.js', ["require", "exports", "../lib/polyfills/promise", "../core/service", "../lib/amd-loader/index"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    require("../lib/polyfills/promise");
	    var service_1 = require("../core/service");
	    var index_1 = require("../lib/amd-loader/index");
	    var IModuleProvider = /** @class */ (function () {
	        function IModuleProvider() {
	        }
	        return IModuleProvider;
	    }());
	    exports.IModuleProvider = IModuleProvider;
	    var ModuleProvider = /** @class */ (function (_super) {
	        __extends(ModuleProvider, _super);
	        function ModuleProvider() {
	            return _super.call(this) || this;
	        }
	        ModuleProvider.prototype.get = function (uri) {
	            return index_1.load("/" + uri);
	        };
	        ModuleProvider = __decorate([
	            service_1.Service({
	                key: IModuleProvider
	            }),
	            __metadata("design:paramtypes", [])
	        ], ModuleProvider);
	        return ModuleProvider;
	    }(IModuleProvider));
	    exports.ModuleProvider = ModuleProvider;
	});
	
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
	        define('src/service/router.js', ["require", "exports", "../core/service", "../service/configManager"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    var service_1 = require("../core/service");
	    var configManager_1 = require("../service/configManager");
	    var IRouter = /** @class */ (function () {
	        function IRouter() {
	        }
	        return IRouter;
	    }());
	    exports.IRouter = IRouter;
	    var Router = /** @class */ (function (_super) {
	        __extends(Router, _super);
	        function Router(configManager) {
	            var _this = _super.call(this) || this;
	            _this.configManager = configManager;
	            _this._callbacks = [];
	            window.onpopstate = function (state) { return _this.change(location.href); };
	            window.onhashchange = function (state) { return _this.change(location.href); };
	            return _this;
	        }
	        Router.prototype.on = function (callback) {
	            var parsed = this.parse(location.href);
	            callback(parsed.href, parsed.pathname, parsed.hash);
	            this._callbacks.push(callback);
	        };
	        Router.prototype.trigger = function (href, replace) {
	            if (!replace) {
	                history.pushState({}, '', href);
	            }
	            else {
	                history.replaceState({}, '', href);
	            }
	            this.change(href);
	        };
	        Router.prototype.change = function (str) {
	            if (this._last !== str) {
	                this._last = str;
	                var parsed = this.parse(str);
	                this._callbacks.forEach(function (callback) { return callback(parsed.href, parsed.pathname, parsed.hash); });
	            }
	        };
	        Router.prototype.parse = function (href) {
	            var a = document.createElement('a');
	            a.href = href;
	            return a;
	        };
	        Router.prototype.getUrl = function (localUri) {
	            var configuration = this.configManager.getConfig();
	            var url = localUri;
	            if (configuration && configuration.path) {
	                configuration.path.some(function (path) {
	                    if (url.match(path.test)) {
	                        url = url.replace(path.test, path.result);
	                        return true;
	                    }
	                });
	            }
	            return url;
	        };
	        Router = __decorate([
	            service_1.Service({
	                key: IRouter
	            }),
	            __metadata("design:paramtypes", [configManager_1.IConfigManager])
	        ], Router);
	        return Router;
	    }(IRouter));
	    exports.Router = Router;
	});
	
	(function (factory) {
	    if (typeof module === "object" && typeof module.exports === "object") {
	        var v = factory(require, exports);
	        if (v !== undefined) module.exports = v;
	    }
	    else if (typeof define === "function" && define.amd) {
	        define('src/directive/view.js', ["require", "exports", "../lib/polyfills/promise", "../service/viewProvider", "../lib/dom/index"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    require("../lib/polyfills/promise");
	    var viewProvider_1 = require("../service/viewProvider");
	    var index_1 = require("../lib/dom/index");
	    function view(valueAccessor, param) {
	        var callback = param instanceof Function && param || param && param.callback;
	        var beforeIn = param && param.beforeIn;
	        var afterIn = param && param.afterIn;
	        var beforeOut = param && param.beforeOut;
	        var afterOut = param && param.afterOut;
	        return function (element, serviceProvider) {
	            element.innerHTML = "";
	            return function () {
	                var value = valueAccessor();
	                var array = !value || value instanceof Array ? (value || []) : [value];
	                var deleted = index_1.createElement("<div></div>");
	                var added = index_1.createElement("<div></div>");
	                var promises = array.map(function (item) { return serviceProvider.getService(viewProvider_1.IViewProvider).getNode(item); });
	                Promise.all(promises)
	                    .then(function (elts) {
	                    element.childNodes.forEach(function (el) {
	                        beforeOut && beforeOut(el);
	                        deleted.appendChild(el);
	                        afterOut && afterOut(el);
	                        index_1.dispatchEvent(el, 'custom:view:dom:remove');
	                    });
	                    elts.forEach(function (el) {
	                        beforeIn && beforeIn(el);
	                        element.appendChild(el);
	                        afterIn && afterIn(el);
	                        index_1.dispatchEvent(el, 'custom:view:dom:added');
	                    });
	                    callback && callback(value);
	                    return elts;
	                });
	            };
	        };
	    }
	    exports.view = view;
	});
	
	(function (factory) {
	    if (typeof module === "object" && typeof module.exports === "object") {
	        var v = factory(require, exports);
	        if (v !== undefined) module.exports = v;
	    }
	    else if (typeof define === "function" && define.amd) {
	        define('src/directive/on.js', ["require", "exports"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    function on(event, valueAccessor) {
	        return function (element) {
	            element.addEventListener(event, function (e) {
	                var stopPropagation = valueAccessor().call(element, e);
	                stopPropagation && e.stopPropagation();
	            });
	            return function () { };
	        };
	    }
	    exports.on = on;
	});
	
	(function (factory) {
	    if (typeof module === "object" && typeof module.exports === "object") {
	        var v = factory(require, exports);
	        if (v !== undefined) module.exports = v;
	    }
	    else if (typeof define === "function" && define.amd) {
	        define('src/directive/dom.js', ["require", "exports", "on"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    var on_1 = require("on");
	    function dom(option) {
	        return function (element, serviceProvider) {
	            var fns = [
	                on_1.on('custom:view:dom:remove', function () { return function (e) {
	                    if (e.target === e.currentTarget) {
	                        option.out(e);
	                        return true;
	                    }
	                    return false;
	                }; })(element, serviceProvider),
	                on_1.on('custom:view:dom:added', function () { return function (e) {
	                    if (e.target === e.currentTarget) {
	                        option.in(e);
	                        return true;
	                    }
	                    return false;
	                }; })(element, serviceProvider)
	            ];
	            return function () { return fns.map(function (fn) { return fn(); }); };
	        };
	    }
	    exports.dom = dom;
	});
	
	(function (factory) {
	    if (typeof module === "object" && typeof module.exports === "object") {
	        var v = factory(require, exports);
	        if (v !== undefined) module.exports = v;
	    }
	    else if (typeof define === "function" && define.amd) {
	        define('src/directive/attr.js', ["require", "exports"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    function attr(valueAccessor) {
	        return function (element) {
	            return function () {
	                var value = valueAccessor();
	                for (var key in value) {
	                    if (value[key] === undefined) {
	                        element.removeAttribute(key);
	                    }
	                    else {
	                        element.setAttribute(key, value[key]);
	                    }
	                }
	            };
	        };
	    }
	    exports.attr = attr;
	});
	
	(function (factory) {
	    if (typeof module === "object" && typeof module.exports === "object") {
	        var v = factory(require, exports);
	        if (v !== undefined) module.exports = v;
	    }
	    else if (typeof define === "function" && define.amd) {
	        define('src/directive/change.js', ["require", "exports", "on"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    var on_1 = require("on");
	    function change(valueAccessor) {
	        return on_1.on('change', valueAccessor);
	    }
	    exports.change = change;
	});
	
	(function (factory) {
	    if (typeof module === "object" && typeof module.exports === "object") {
	        var v = factory(require, exports);
	        if (v !== undefined) module.exports = v;
	    }
	    else if (typeof define === "function" && define.amd) {
	        define('src/directive/click.js', ["require", "exports", "on"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    var on_1 = require("on");
	    function click(valueAccessor) {
	        return on_1.on('click', valueAccessor);
	    }
	    exports.click = click;
	});
	
	(function (factory) {
	    if (typeof module === "object" && typeof module.exports === "object") {
	        var v = factory(require, exports);
	        if (v !== undefined) module.exports = v;
	    }
	    else if (typeof define === "function" && define.amd) {
	        define('src/directive/text.js', ["require", "exports"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    function text(valueAccessor) {
	        return function (element) {
	            return function () {
	                var value = valueAccessor();
	                element.textContent = value || '';
	            };
	        };
	    }
	    exports.text = text;
	});
	
	(function (factory) {
	    if (typeof module === "object" && typeof module.exports === "object") {
	        var v = factory(require, exports);
	        if (v !== undefined) module.exports = v;
	    }
	    else if (typeof define === "function" && define.amd) {
	        define('src/directive/value.js', ["require", "exports", "on"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    var on_1 = require("on");
	    function value(options) {
	        return function (element, serviceProvider) {
	            var fns = [on_1.on(options.on || 'input', function () { return function (e) {
	                    var target = e.currentTarget;
	                    var value = target.value;
	                    if (target.type == "checkbox") {
	                        value = target.checked;
	                    }
	                    options.set(value);
	                    return true;
	                }; })(element, serviceProvider),
	                (function (element, serviceProvider) { return function () {
	                    var value = options.get();
	                    if (element.type == "checkbox") {
	                        element.checked = value;
	                    }
	                    else {
	                        element.value = value || '';
	                    }
	                }; })(element, serviceProvider)];
	            return function () { return fns.map(function (fn) { return fn(); }); };
	        };
	    }
	    exports.value = value;
	});
	
	(function (factory) {
	    if (typeof module === "object" && typeof module.exports === "object") {
	        var v = factory(require, exports);
	        if (v !== undefined) module.exports = v;
	    }
	    else if (typeof define === "function" && define.amd) {
	        define('src/directive/options.js', ["require", "exports", "../lib/dom/index"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    var index_1 = require("../lib/dom/index");
	    function options(valueAccessor) {
	        return function (element) {
	            element.innerHTML = "";
	            return function () {
	                var value = valueAccessor();
	                element.innerHTML = "";
	                value.map(function (item) {
	                    var opt = index_1.createElement("<option></option>");
	                    opt.value = item.id;
	                    opt.textContent = item.text;
	                    return opt;
	                }).forEach(function (o) { return element.appendChild(o); });
	            };
	        };
	    }
	    exports.options = options;
	});
	
	(function (factory) {
	    if (typeof module === "object" && typeof module.exports === "object") {
	        var v = factory(require, exports);
	        if (v !== undefined) module.exports = v;
	    }
	    else if (typeof define === "function" && define.amd) {
	        define('src/directive/each.js', ["require", "exports", "../core/view", "../lib/dom/index"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    var view_1 = require("../core/view");
	    var index_1 = require("../lib/dom/index");
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
	    function each(valueAccessor) {
	        return function (element, serviceProvider) {
	            var template = element.innerHTML;
	            element.innerHTML = "";
	            return function () {
	                var value = valueAccessor();
	                element.innerHTML = "";
	                value.map(function (item) {
	                    var t = index_1.createElement(template);
	                    foreach(item, function (valueAccessor, selector) {
	                        (selector.trim() === "this" && [t] || t.querySelectorAll(selector)).forEach(function (el, i) {
	                            new view_1.BindManager(el, serviceProvider).manage(valueAccessor);
	                        });
	                    });
	                    return t;
	                }).forEach(function (el) { return element.appendChild(el); });
	            };
	        };
	    }
	    exports.each = each;
	});
	
	(function (factory) {
	    if (typeof module === "object" && typeof module.exports === "object") {
	        var v = factory(require, exports);
	        if (v !== undefined) module.exports = v;
	    }
	    else if (typeof define === "function" && define.amd) {
	        define('src/directive/class.js', ["require", "exports"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    function addClass(element, className) {
	        var arr = element.className.split(" ");
	        if (arr.indexOf(className) == -1) {
	            element.className += " " + className;
	        }
	    }
	    function removeClass(element, className) {
	        var arr = element.className.split(" ");
	        arr = arr.filter(function (name) { return name !== className; });
	        element.className = arr.join(' ');
	    }
	    function classes(valueAccessor) {
	        return function (element) {
	            return function () {
	                var value = valueAccessor();
	                for (var key in value) {
	                    if (value[key]) {
	                        addClass(element, key);
	                    }
	                    else {
	                        removeClass(element, key);
	                    }
	                }
	            };
	        };
	    }
	    exports.classes = classes;
	});
	
	(function (factory) {
	    if (typeof module === "object" && typeof module.exports === "object") {
	        var v = factory(require, exports);
	        if (v !== undefined) module.exports = v;
	    }
	    else if (typeof define === "function" && define.amd) {
	        define('src/directive/router.js', ["require", "exports", "../service/router"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    var router_1 = require("../service/router");
	    function router() {
	        return function (element, serviceProvider) {
	            document.body.addEventListener("click", function (e) {
	                var target = e.target;
	                if (target.tagName.toLowerCase() === 'a') {
	                    var href = target.pathname;
	                    serviceProvider.getService(router_1.IRouter).trigger(href);
	                    e.preventDefault();
	                    return false;
	                }
	            });
	            return function () {
	            };
	        };
	    }
	    exports.router = router;
	});
	
	(function (factory) {
	    if (typeof module === "object" && typeof module.exports === "object") {
	        var v = factory(require, exports);
	        if (v !== undefined) module.exports = v;
	    }
	    else if (typeof define === "function" && define.amd) {
	        define('src/core/index.js', ["require", "exports", "../lib/polyfills/object-assign", "../lib/polyfills/array-foreach", "../lib/polyfills/array-map", "../lib/polyfills/promise", "./service", "../service/viewProvider", "../lib/amd-loader/index", "../service/configManager", "../lib/amd-loader/index", "./view", "./service", "../service/serviceProvider", "../service/eventManager", "../service/viewProvider", "../service/observalizer", "../service/moduleProvider", "../service/router", "../service/ajax", "../service/configManager", "../directive/view", "../directive/on", "../directive/dom", "../directive/attr", "../directive/change", "../directive/click", "../directive/text", "../directive/value", "../directive/options", "../directive/each", "../directive/class", "../directive/router"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    function __export(m) {
	        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	    Object.defineProperty(exports, "__esModule", { value: true });
	    require("../lib/polyfills/object-assign");
	    require("../lib/polyfills/array-foreach");
	    require("../lib/polyfills/array-map");
	    require("../lib/polyfills/promise");
	    var service_1 = require("./service");
	    var viewProvider_1 = require("../service/viewProvider");
	    var index_1 = require("../lib/amd-loader/index");
	    var configManager_1 = require("../service/configManager");
	    var index_2 = require("../lib/amd-loader/index");
	    exports.load = index_2.load;
	    var view_1 = require("./view");
	    exports.View = view_1.View;
	    var service_2 = require("./service");
	    exports.Service = service_2.Service;
	    var serviceProvider_1 = require("../service/serviceProvider");
	    exports.IServiceProvider = serviceProvider_1.IServiceProvider;
	    exports.ServiceProvider = serviceProvider_1.ServiceProvider;
	    var eventManager_1 = require("../service/eventManager");
	    exports.IEventManager = eventManager_1.IEventManager;
	    exports.EventManager = eventManager_1.EventManager;
	    exports.Event = eventManager_1.Event;
	    var viewProvider_2 = require("../service/viewProvider");
	    exports.IViewProvider = viewProvider_2.IViewProvider;
	    exports.ViewProvider = viewProvider_2.ViewProvider;
	    var observalizer_1 = require("../service/observalizer");
	    exports.IObservablizer = observalizer_1.IObservablizer;
	    exports.Observablizer = observalizer_1.Observablizer;
	    var moduleProvider_1 = require("../service/moduleProvider");
	    exports.IModuleProvider = moduleProvider_1.IModuleProvider;
	    exports.ModuleProvider = moduleProvider_1.ModuleProvider;
	    var router_1 = require("../service/router");
	    exports.IRouter = router_1.IRouter;
	    exports.Router = router_1.Router;
	    var ajax_1 = require("../service/ajax");
	    exports.IAjax = ajax_1.IAjax;
	    exports.Ajax = ajax_1.Ajax;
	    var configManager_2 = require("../service/configManager");
	    exports.IConfigManager = configManager_2.IConfigManager;
	    exports.ConfigManager = configManager_2.ConfigManager;
	    __export(require("../directive/view"));
	    __export(require("../directive/on"));
	    __export(require("../directive/dom"));
	    __export(require("../directive/attr"));
	    __export(require("../directive/change"));
	    __export(require("../directive/click"));
	    __export(require("../directive/text"));
	    __export(require("../directive/value"));
	    __export(require("../directive/options"));
	    __export(require("../directive/each"));
	    __export(require("../directive/class"));
	    __export(require("../directive/router"));
	    /** @description Startup du framework pour lancer l'application.
	     * @param {selector} string Sélecteur css pour cibler l'élément du DOM root de l'application.
	     * @param {view} class Vue qui sera instanciée en tant que vue root de l'application.
	     * @return
	     */
	    function startup(selector, view) {
	        var viewProvider = service_1.serviceProvider.getService(viewProvider_1.IViewProvider);
	        viewProvider.getNode(viewProvider.newInstance(view)).then(function (el) { return document.querySelector(selector).appendChild(el); });
	    }
	    exports.startup = startup;
	    if (typeof __META__ === "undefined" || __META__.MODE !== "AMD") {
	        var scripts = document.getElementsByTagName('script');
	        var script = scripts[scripts.length - 1];
	        var configFileName = script.getAttribute("config");
	        var mainFileName = script.getAttribute("startup");
	        var placeHolder = script.getAttribute("placeholder");
	        index_1.define(script.src, [], function () { return exports; })();
	        placeHolder && ((configFileName && index_1.load(configFileName).then(function (conf) {
	            service_1.serviceProvider.getService(configManager_1.IConfigManager).setConfig(conf.default);
	            index_1.config(conf && conf.default || {});
	        }) || Promise.resolve())
	            .then(function () { return (mainFileName && index_1.load(mainFileName) || Promise.resolve(null)).then(function (modules) {
	            var clss = modules && modules[Object.keys(modules).filter(function (_) { return _.indexOf("_") !== 0; })[0]];
	            clss && startup(placeHolder, clss);
	        }); }));
	    }
	});
	
	(function (factory) {
	    if (typeof module === "object" && typeof module.exports === "object") {
	        var v = factory(require, exports);
	        if (v !== undefined) module.exports = v;
	    }
	    else if (typeof define === "function" && define.amd) {
	        define('src/index.js', ["require", "exports", "core/index"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    function __export(m) {
	        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	    Object.defineProperty(exports, "__esModule", { value: true });
	    __export(require("core/index"));
	});
	

	return define('export', ["src/index"], function(m) { 
		return m;
	});
}, typeof window !== "undefined" && window || {});
})()
