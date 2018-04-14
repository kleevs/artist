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
		var required = ['jQuery'];
		define(['/jquery'], function () { 
			Array.prototype.forEach.call(arguments, function(res, i) {
				moduleRequired[required[i]] = res;
			}); 
			
			return factory(context); 
		});
	} else {
		__META__.MODE = "";
		var m = factory(context);
		window.Artist = m;
	}

})(function (context) {
	var throw_exception = function (msg) { throw msg; };
	var jQuery = typeof(context['jQuery']) !== "undedined" && context['jQuery'] || __REQUIRE__['jQuery'] || throw_exception("jQuery is required.");
	__REQUIRE__ = undefined;
	throw_exception = undefined;
	context = undefined;
	var define = (function() {
		var paths = [{ test: /^\/?(node_modules\/*)/, result: "/$1" }];
		var modules = {};
		var getUri = function(uri, context) {
			var link = document.createElement("a");
			paths.some(path => {
				if (uri.match(path.test)) {
					uri = uri.replace(path.test, path.result);
					return true;
				}
			});
			var href = (uri && !uri.match(/^\//) && context && context.replace(/(\/?)[^\/]*$/, '$1') || '') + uri;
			var res = href.replace(/^\/?(.*)$/, '/$1.js');
			link.href = res.replace(/\\/gi, "/");
			return link.pathname.replace(/^\//, '');
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

	(function (factory) {
	    if (typeof module === "object" && typeof module.exports === "object") {
	        var v = factory(require, exports);
	        if (v !== undefined) module.exports = v;
	    }
	    else if (typeof define === "function" && define.amd) {
	        define('node_modules/observable/src/core.js', ["require", "exports"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
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
	    function contains(array, item) {
	        let res = false;
	        foreach(array, (x) => { res = res || item === x; });
	        return res;
	    }
	    let stack = [];
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
	        var listeners = [], defaultValue = {}, value = defaultValue;
	        return () => {
	            var observer = peek() && peek().func, firstCall = defaultValue === value;
	            if (observer && !contains(listeners, observer)) {
	                listeners.push(observer);
	            }
	            if (observer && !firstCall) {
	                return value;
	            }
	            if (value !== (value = fn.apply(this, arguments)) && !firstCall) {
	                var tmp = listeners;
	                listeners = [];
	                tmp.forEach((observer) => observer());
	            }
	            return value;
	        };
	    }
	    exports.observable = observable;
	    function observer(fn) {
	        var me;
	        (me = () => {
	            push(me);
	            var res = fn();
	            pop();
	            return res;
	        })();
	    }
	    exports.observer = observer;
	    function blind(fn) {
	        var me;
	        (me = () => {
	            push(null);
	            var res = fn();
	            pop();
	            return res;
	        })();
	    }
	    exports.blind = blind;
	});
	//# sourceMappingURL=core.js.map
	(function (factory) {
	    if (typeof module === "object" && typeof module.exports === "object") {
	        var v = factory(require, exports);
	        if (v !== undefined) module.exports = v;
	    }
	    else if (typeof define === "function" && define.amd) {
	        define('node_modules/observable/src/observable.js', ["require", "exports", "./core"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    const core_1 = require("./core");
	    function create(value) {
	        var result = value;
	        var obj = core_1.observable(() => result);
	        return function (value) {
	            arguments.length > 0 && (result = value);
	            obj.apply(this);
	            return result;
	        };
	    }
	    exports.create = create;
	});
	//# sourceMappingURL=observable.js.map
	(function (factory) {
	    if (typeof module === "object" && typeof module.exports === "object") {
	        var v = factory(require, exports);
	        if (v !== undefined) module.exports = v;
	    }
	    else if (typeof define === "function" && define.amd) {
	        define('node_modules/observable/src/observer.js', ["require", "exports", "./core"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    const core_1 = require("./core");
	    function create(fn) {
	        return core_1.observer(fn);
	    }
	    exports.create = create;
	});
	//# sourceMappingURL=observer.js.map
	(function (factory) {
	    if (typeof module === "object" && typeof module.exports === "object") {
	        var v = factory(require, exports);
	        if (v !== undefined) module.exports = v;
	    }
	    else if (typeof define === "function" && define.amd) {
	        define('node_modules/observable/src/blind.js', ["require", "exports", "./core"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    const core_1 = require("./core");
	    function create(fn) {
	        return core_1.blind(fn);
	    }
	    exports.create = create;
	});
	//# sourceMappingURL=blind.js.map
	(function (factory) {
	    if (typeof module === "object" && typeof module.exports === "object") {
	        var v = factory(require, exports);
	        if (v !== undefined) module.exports = v;
	    }
	    else if (typeof define === "function" && define.amd) {
	        define('node_modules/observable/src/index.js', ["require", "exports", "./observable", "./observer", "./blind"], factory);
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
	//# sourceMappingURL=index.js.map
	(function (factory) {
	    if (typeof module === "object" && typeof module.exports === "object") {
	        var v = factory(require, exports);
	        if (v !== undefined) module.exports = v;
	    }
	    else if (typeof define === "function" && define.amd) {
	        define('node_modules/reflect-decorator/src/index.js', ["require", "exports"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    var context = window;
	    context.Reflect = context.Reflect || {};
	    context.Reflect.metadata = (k, v) => {
	        return (target, metadata) => {
	            metadata[k] = v;
	        };
	    };
	    context.Reflect.decorate = (decorators, target, key, desc) => {
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
	//# sourceMappingURL=index.js.map
	(function (factory) {
	    if (typeof module === "object" && typeof module.exports === "object") {
	        var v = factory(require, exports);
	        if (v !== undefined) module.exports = v;
	    }
	    else if (typeof define === "function" && define.amd) {
	        define('node_modules/dependency-injection/src/index.js', ["require", "exports", "node_modules/reflect-decorator/src/index"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    require("node_modules/reflect-decorator/src/index");
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
	//# sourceMappingURL=index.js.map
	(function (factory) {
	    if (typeof module === "object" && typeof module.exports === "object") {
	        var v = factory(require, exports);
	        if (v !== undefined) module.exports = v;
	    }
	    else if (typeof define === "function" && define.amd) {
	        define('src/mixin.js', ["require", "exports"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
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
	    exports.foreach = foreach;
	    function map(array, parse) {
	        let res = [];
	        foreach(array, (x) => { res.push(parse(x)); return false; });
	        return res;
	    }
	    exports.map = map;
	    function grep(array, predicate) {
	        let i, res = [];
	        for (i = 0; i < array.length; i++) {
	            if (predicate(array[i], i))
	                res.push(array[i]);
	        }
	        return res;
	    }
	    exports.grep = grep;
	});
	
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
	        define('src/service.js', ["require", "exports", "node_modules/observable/src/index", "node_modules/dependency-injection/src/index", "./mixin"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    const index_1 = require("node_modules/observable/src/index");
	    const index_2 = require("node_modules/dependency-injection/src/index");
	    const mixin_1 = require("./mixin");
	    var injector = new index_2.DependencyInjector();
	    exports.config = injector.getConfig();
	    exports.serviceProvider = injector.getProvider();
	    exports.Injectable = injector.getDecorator();
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
	        exports.Injectable({
	            key: IObservablizer
	        })
	    ], Observablizer);
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
	        exports.Injectable({
	            key: INotifier
	        })
	    ], Notifier);
	});
	
	(function (factory) {
	    if (typeof module === "object" && typeof module.exports === "object") {
	        var v = factory(require, exports);
	        if (v !== undefined) module.exports = v;
	    }
	    else if (typeof define === "function" && define.amd) {
	        define('node_modules/binder/src/binder.js', ["require", "exports", "node_modules/observable/src/index"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    const index_1 = require("node_modules/observable/src/index");
	    class Binder {
	        constructor(element) {
	            this.element = element;
	        }
	        bind(callback) {
	            var fn = callback(this.element, this);
	            index_1.blind(() => index_1.observer(() => fn()));
	        }
	    }
	    exports.Binder = Binder;
	});
	//# sourceMappingURL=binder.js.map
	define('node_modules/jquery/dist/jquery.js', [], function() { return jQuery; });
	(function (factory) {
	    if (typeof module === "object" && typeof module.exports === "object") {
	        var v = factory(require, exports);
	        if (v !== undefined) module.exports = v;
	    }
	    else if (typeof define === "function" && define.amd) {
	        define('node_modules/binder/src/handler/attr.js', ["require", "exports", "node_modules/jquery/dist/jquery"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    const $ = require("node_modules/jquery/dist/jquery");
	    function attr(valueAccessor) {
	        return (element) => {
	            var $element = $(element);
	            return () => {
	                var value = valueAccessor();
	                for (var key in value) {
	                    if (value[key] === undefined) {
	                        $element.removeAttr(key);
	                    }
	                    else {
	                        $element.attr(key, value[key]);
	                    }
	                }
	            };
	        };
	    }
	    exports.attr = attr;
	});
	//# sourceMappingURL=attr.js.map
	(function (factory) {
	    if (typeof module === "object" && typeof module.exports === "object") {
	        var v = factory(require, exports);
	        if (v !== undefined) module.exports = v;
	    }
	    else if (typeof define === "function" && define.amd) {
	        define('node_modules/binder/src/handler/change.js', ["require", "exports", "node_modules/jquery/dist/jquery"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    const $ = require("node_modules/jquery/dist/jquery");
	    function change(valueAccessor) {
	        return (element) => {
	            $(element).change((e) => {
	                return valueAccessor().call(element, e);
	            });
	            return () => { };
	        };
	    }
	    exports.change = change;
	});
	//# sourceMappingURL=change.js.map
	(function (factory) {
	    if (typeof module === "object" && typeof module.exports === "object") {
	        var v = factory(require, exports);
	        if (v !== undefined) module.exports = v;
	    }
	    else if (typeof define === "function" && define.amd) {
	        define('node_modules/binder/src/handler/click.js', ["require", "exports", "node_modules/jquery/dist/jquery"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    const $ = require("node_modules/jquery/dist/jquery");
	    function click(valueAccessor) {
	        return (element) => {
	            $(element).click((e) => {
	                return valueAccessor().call(element, e);
	            });
	            return () => { };
	        };
	    }
	    exports.click = click;
	});
	//# sourceMappingURL=click.js.map
	(function (factory) {
	    if (typeof module === "object" && typeof module.exports === "object") {
	        var v = factory(require, exports);
	        if (v !== undefined) module.exports = v;
	    }
	    else if (typeof define === "function" && define.amd) {
	        define('node_modules/binder/src/handler/text.js', ["require", "exports", "node_modules/jquery/dist/jquery"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    const $ = require("node_modules/jquery/dist/jquery");
	    function text(valueAccessor) {
	        return (element) => {
	            var $element = $(element);
	            return () => {
	                var value = valueAccessor();
	                $element.text(value);
	            };
	        };
	    }
	    exports.text = text;
	});
	//# sourceMappingURL=text.js.map
	(function (factory) {
	    if (typeof module === "object" && typeof module.exports === "object") {
	        var v = factory(require, exports);
	        if (v !== undefined) module.exports = v;
	    }
	    else if (typeof define === "function" && define.amd) {
	        define('node_modules/binder/src/handler/value.js', ["require", "exports", "node_modules/jquery/dist/jquery"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    const $ = require("node_modules/jquery/dist/jquery");
	    function value(valueAccessor) {
	        return (element) => {
	            var $element = $(element);
	            $element.on("input", () => {
	                valueAccessor.set($element.val());
	            });
	            return () => {
	                var value = valueAccessor.get();
	                $element.val(value);
	            };
	        };
	    }
	    exports.value = value;
	});
	//# sourceMappingURL=value.js.map
	(function (factory) {
	    if (typeof module === "object" && typeof module.exports === "object") {
	        var v = factory(require, exports);
	        if (v !== undefined) module.exports = v;
	    }
	    else if (typeof define === "function" && define.amd) {
	        define('node_modules/binder/src/handler/base/mixin.js', ["require", "exports"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
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
	    exports.foreach = foreach;
	    function map(array, parse) {
	        let res = [];
	        foreach(array, (x) => { res.push(parse(x)); return false; });
	        return res;
	    }
	    exports.map = map;
	    function grep(array, predicate) {
	        let i, res = [];
	        for (i = 0; i < array.length; i++) {
	            if (predicate(array[i], i))
	                res.push(array[i]);
	        }
	        return res;
	    }
	    exports.grep = grep;
	});
	//# sourceMappingURL=mixin.js.map
	(function (factory) {
	    if (typeof module === "object" && typeof module.exports === "object") {
	        var v = factory(require, exports);
	        if (v !== undefined) module.exports = v;
	    }
	    else if (typeof define === "function" && define.amd) {
	        define('node_modules/binder/src/handler/options.js', ["require", "exports", "./base/mixin", "node_modules/jquery/dist/jquery"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    const mixin_1 = require("./base/mixin");
	    const $ = require("node_modules/jquery/dist/jquery");
	    function options(valueAccessor) {
	        return (element) => {
	            var $element = $(element);
	            $element.html("");
	            return () => {
	                var value = valueAccessor();
	                $element.html("");
	                $element.append(mixin_1.map(value, (item) => {
	                    var $opt = $("<option>");
	                    $opt.val(item.id);
	                    $opt.text(item.text);
	                    return $opt;
	                }));
	                $element.val($element.data("value"));
	            };
	        };
	    }
	    exports.options = options;
	});
	//# sourceMappingURL=options.js.map
	(function (factory) {
	    if (typeof module === "object" && typeof module.exports === "object") {
	        var v = factory(require, exports);
	        if (v !== undefined) module.exports = v;
	    }
	    else if (typeof define === "function" && define.amd) {
	        define('node_modules/binder/src/handler/each.js', ["require", "exports", "node_modules/jquery/dist/jquery", "../binder", "./base/mixin"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    const $ = require("node_modules/jquery/dist/jquery");
	    const binder_1 = require("../binder");
	    const mixin_1 = require("./base/mixin");
	    function each(valueAccessor) {
	        return (element) => {
	            var $element = $(element), template = $element.html();
	            $element.html("");
	            return () => {
	                var value = valueAccessor();
	                $element.html("");
	                value.forEach((item) => {
	                    var t = $(template);
	                    mixin_1.foreach(item, (valueAccessor, selector) => {
	                        (selector.trim() === "this" && t || t.find(selector)).each((i, el) => {
	                            new binder_1.Binder(el).bind(valueAccessor);
	                        });
	                    });
	                    $element.append(t);
	                });
	            };
	        };
	    }
	    exports.each = each;
	});
	//# sourceMappingURL=each.js.map
	(function (factory) {
	    if (typeof module === "object" && typeof module.exports === "object") {
	        var v = factory(require, exports);
	        if (v !== undefined) module.exports = v;
	    }
	    else if (typeof define === "function" && define.amd) {
	        define('node_modules/binder/src/handler/class.js', ["require", "exports", "node_modules/jquery/dist/jquery"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    const $ = require("node_modules/jquery/dist/jquery");
	    function classes(valueAccessor) {
	        return (element) => {
	            var $element = $(element);
	            return () => {
	                var value = valueAccessor();
	                for (var key in value) {
	                    if (value[key]) {
	                        $element.addClass(key);
	                    }
	                    else {
	                        $element.removeClass(key);
	                    }
	                }
	            };
	        };
	    }
	    exports.classes = classes;
	});
	//# sourceMappingURL=class.js.map
	(function (factory) {
	    if (typeof module === "object" && typeof module.exports === "object") {
	        var v = factory(require, exports);
	        if (v !== undefined) module.exports = v;
	    }
	    else if (typeof define === "function" && define.amd) {
	        define('node_modules/binder/src/handlers.js', ["require", "exports", "./handler/attr", "./handler/change", "./handler/click", "./handler/text", "./handler/value", "./handler/options", "./handler/each", "./handler/class"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    function __export(m) {
	        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	    Object.defineProperty(exports, "__esModule", { value: true });
	    __export(require("./handler/attr"));
	    __export(require("./handler/change"));
	    __export(require("./handler/click"));
	    __export(require("./handler/text"));
	    __export(require("./handler/value"));
	    __export(require("./handler/options"));
	    __export(require("./handler/each"));
	    __export(require("./handler/class"));
	});
	//# sourceMappingURL=handlers.js.map
	(function (factory) {
	    if (typeof module === "object" && typeof module.exports === "object") {
	        var v = factory(require, exports);
	        if (v !== undefined) module.exports = v;
	    }
	    else if (typeof define === "function" && define.amd) {
	        define('node_modules/binder/src/index.js', ["require", "exports", "node_modules/observable/src/index", "./binder", "./handlers"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    function __export(m) {
	        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	    Object.defineProperty(exports, "__esModule", { value: true });
	    __export(require("node_modules/observable/src/index"));
	    __export(require("./binder"));
	    __export(require("./handlers"));
	});
	//# sourceMappingURL=index.js.map
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
	        define('src/view.js', ["require", "exports", "node_modules/binder/src/index", "./service", "./mixin", "node_modules/jquery/dist/jquery"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    const index_1 = require("node_modules/binder/src/index");
	    const service_1 = require("./service");
	    const mixin_1 = require("./mixin");
	    const $ = require("node_modules/jquery/dist/jquery");
	    let registeredView = [];
	    function View(options) {
	        return (constructor, metadata) => {
	            options = constructor.prototype.__view__option__ = $.extend(true, constructor.prototype.__view__option__, options);
	            var viewType;
	            registeredView.push(viewType = {
	                construct: constructor,
	                binding: options.binding,
	                html: new Promise((resolve, reject) => {
	                    options.html && resolve(options.html);
	                    options.template && !options.html && (() => {
	                        $("<div>").load(`/${options.template}`, (template, status) => {
	                            status == "error" && (reject() || true) ||
	                                resolve(template);
	                        });
	                    })();
	                })
	            });
	            var key = constructor;
	            while (key && key.constructor !== key) {
	                service_1.Injectable({
	                    key: key,
	                    registerable: false,
	                    initialize: (view) => {
	                        var binding = viewType.binding;
	                        view && view.initialize && view.initialize();
	                        viewType && (view.__elt__ = viewType.html.then(template => {
	                            var t = $(template);
	                            t.attr("artist-view", true);
	                            mixin_1.foreach(binding, (valueAccessor, selector) => {
	                                (selector.trim() === "this" && t || t.find(selector)).each((i, el) => {
	                                    var binder = valueAccessor(view);
	                                    var binders = binder && !(binder instanceof Array) && [binder] || binder;
	                                    binders.forEach(b => new index_1.Binder(el).bind(b));
	                                });
	                            });
	                            t[0].__view__ = view;
	                            return t[0];
	                        }));
	                    }
	                })(constructor, metadata);
	                key = Object.getPrototypeOf(key);
	            }
	        };
	    }
	    exports.View = View;
	    class IViewProvider {
	    }
	    exports.IViewProvider = IViewProvider;
	    let ViewProvider = class ViewProvider {
	        newInstance(type, arg) {
	            var viewType = type && mixin_1.grep(registeredView, (view) => (view.construct.prototype instanceof type) || (type === view.construct))[0];
	            var view = viewType && (service_1.serviceProvider && service_1.config.getService(viewType.construct) && service_1.serviceProvider.createService(viewType.construct) || new viewType.construct());
	            return view;
	        }
	        map(type) {
	            return (arg) => this.newInstance(type, arg);
	        }
	        getNode(view) {
	            return view && view.__elt__;
	        }
	        getView(element) {
	            return element && element.__view__;
	        }
	    };
	    ViewProvider = __decorate([
	        service_1.Injectable({
	            key: IViewProvider
	        })
	    ], ViewProvider);
	    function view(valueAccessor) {
	        return (element) => {
	            var $element = $(element);
	            $element.html("");
	            return () => {
	                var value = valueAccessor();
	                var array = !value || value instanceof Array ? (value || []) : [value];
	                var $deleted = $("<div>");
	                var $added = $("<div>");
	                Promise.all(array.map((item) => service_1.serviceProvider.getService(IViewProvider).getNode(item)))
	                    .then((elts) => {
	                    $element.children().each((i, el) => {
	                        $(el).appendTo($deleted);
	                    });
	                    elts.forEach((el) => {
	                        $element.append(el);
	                    });
	                    return elts;
	                });
	            };
	        };
	    }
	    exports.view = view;
	    function dom(option) {
	        return (element) => {
	            var $element = $(element);
	            $element.on('custom:view:dom:remove', (e) => {
	                if (e.target === e.currentTarget) {
	                    option.out(e);
	                }
	            });
	            $element.on('custom:view:dom:added', (e) => {
	                if (e.target === e.currentTarget) {
	                    option.in(e);
	                }
	            });
	            return () => { };
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
	        define('node_modules/amd-loader/src/index.js', ["require", "exports"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    var allmodules = { "...": {} };
	    var loadedmodules = {};
	    var configuration;
	    var getAbsoluteUri = (uri, context) => {
	        var link = document.createElement("a");
	        if (configuration && configuration.path) {
	            configuration.path.some(path => {
	                if (uri.match(path.test)) {
	                    uri = uri.replace(path.test, path.result);
	                    return true;
	                }
	            });
	        }
	        link.href = (uri && !uri.match(/^\//) && context && context.replace(/(\/?)[^\/]*$/, '$1') || '') + uri;
	        return link.href.replace(/^(.*)$/, '$1.js');
	    };
	    function load(uri) {
	        return new Promise(resolve => {
	            var mod = define([uri], (module) => { resolve(module); });
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
	        return allmodules["..."]["..."] = allmodules["..."][id] = (context) => {
	            return Promise.all(dependencies.map(function (dependency) {
	                if (dependency === "require")
	                    return (uri) => loadedmodules[getAbsoluteUri(uri, context)];
	                if (dependency === "exports")
	                    return exp = {};
	                var src = getAbsoluteUri(dependency, context);
	                return allmodules[src] = allmodules[src] || new Promise(resolve => {
	                    var script = document.createElement('script');
	                    script.async = true;
	                    script.src = src;
	                    document.head.appendChild(script);
	                    script.onload = script.onreadystatechange = () => {
	                        allmodules[src] = allmodules["..."]["..."];
	                        allmodules["..."] = {};
	                        allmodules[src] = allmodules[src] && allmodules[src](src).then(module => resolve(loadedmodules[src] = module)) || resolve();
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
	
	(function (factory) {
	    if (typeof module === "object" && typeof module.exports === "object") {
	        var v = factory(require, exports);
	        if (v !== undefined) module.exports = v;
	    }
	    else if (typeof define === "function" && define.amd) {
	        define('src/index.js', ["require", "exports", "./service", "./view", "node_modules/amd-loader/src/index", "node_modules/jquery/dist/jquery", "node_modules/binder/src/index", "node_modules/dependency-injection/src/index", "./view", "./service"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    function __export(m) {
	        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	    Object.defineProperty(exports, "__esModule", { value: true });
	    const service_1 = require("./service");
	    const view_1 = require("./view");
	    const index_1 = require("node_modules/amd-loader/src/index");
	    const $ = require("node_modules/jquery/dist/jquery");
	    __export(require("node_modules/binder/src/index"));
	    __export(require("node_modules/dependency-injection/src/index"));
	    __export(require("./view"));
	    __export(require("./service"));
	    function startup(selector, view) {
	        var observer = new MutationObserver((records) => {
	            records.forEach(record => {
	                var $removedNodes = $(record.removedNodes);
	                var $addedNodes = $(record.addedNodes);
	                var $removeViews = $(Array.prototype.map.call($removedNodes.filter("[artist-view=true][loaded]"), x => x).concat(Array.prototype.map.call($removedNodes.find("[artist-view=true][loaded]"), x => x)));
	                var $addedViews = $(Array.prototype.map.call($addedNodes.filter("[artist-view=true]:not([loaded])"), x => x).concat(Array.prototype.map.call($addedNodes.find("[artist-view=true]:not([loaded])"), x => x)));
	                $addedViews.attr("loaded", true);
	                $removeViews.removeAttr("loaded");
	                $removeViews.trigger("custom:view:dom:remove");
	                $addedViews.trigger("custom:view:dom:added");
	            });
	        });
	        observer.observe($("body")[0], { childList: true, subtree: true });
	        var viewProvider = service_1.serviceProvider.getService(view_1.IViewProvider);
	        viewProvider.getNode(viewProvider.newInstance(view)).then((el) => $(selector).append(el));
	    }
	    exports.startup = startup;
	    if (typeof __META__ === "undefined" || __META__.MODE !== "AMD") {
	        var scripts = document.getElementsByTagName('script');
	        var script = scripts[scripts.length - 1];
	        var configFileName = script.getAttribute("config");
	        var mainFileName = script.getAttribute("main");
	        var placeHolder = script.getAttribute("placeholder");
	        index_1.define(script.src, [], () => { return exports; })();
	        placeHolder && ((configFileName && index_1.load(configFileName).then((conf) => index_1.config(conf && conf.default || {})) || Promise.resolve())
	            .then(() => index_1.load(mainFileName).then(modules => {
	            var clss = modules[Object.keys(modules)[0]];
	            clss && startup(placeHolder, clss);
	        })));
	    }
	});
	

	return define('export', ["src/index"], function(m) { 
		return m;
	});
}, typeof window !== "undefined" && window || {});
})()
