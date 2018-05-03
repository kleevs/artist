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

			return tmp.filter(_ => _ !== ".").join("/");
		}
		var getUri = function(uri, context) {
			paths.some(path => {
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
	    const index_1 = require("../lib/dependency-injection/index");
	    var injector = new index_1.DependencyInjector();
	    exports.config = injector.getConfig();
	    exports.serviceProvider = injector.getProvider();
	    exports.Service = injector.getDecorator();
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
	        define('src/service/serviceProvider.js', ["require", "exports", "../core/service"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    const service_1 = require("../core/service");
	    class IServiceProvider {
	    }
	    exports.IServiceProvider = IServiceProvider;
	    let ServiceProvider = class ServiceProvider extends IServiceProvider {
	        getService(type) {
	            return service_1.serviceProvider.getService(type);
	        }
	        createService(key, parameters) {
	            return service_1.serviceProvider.createService(key, parameters);
	        }
	    };
	    ServiceProvider = __decorate([
	        service_1.Service({
	            key: IServiceProvider
	        })
	    ], ServiceProvider);
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
	    const core_1 = require("./core");
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
	    const core_1 = require("./core");
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
	    const index_1 = require("../observable/index");
	    class BindManager {
	        constructor(element, data = undefined) {
	            this.element = element;
	            this.data = data;
	        }
	        manage(callback) {
	            var fn = callback(this.element, this.data, this);
	            index_1.blind(() => index_1.observer(() => fn()));
	        }
	    }
	    exports.BindManager = BindManager;
	});
	
	define('node_modules/jquery/dist/jquery.js', [], function() { return jQuery; });
	(function (factory) {
	    if (typeof module === "object" && typeof module.exports === "object") {
	        var v = factory(require, exports);
	        if (v !== undefined) module.exports = v;
	    }
	    else if (typeof define === "function" && define.amd) {
	        define('src/core/view.js', ["require", "exports", "../lib/binder/index", "./service", "node_modules/jquery/dist/jquery"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    const index_1 = require("../lib/binder/index");
	    const service_1 = require("./service");
	    const $ = require("node_modules/jquery/dist/jquery");
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
	    class BindManager extends index_1.BindManager {
	    }
	    exports.BindManager = BindManager;
	    exports.registeredView = [];
	    function View(options) {
	        return (constructor, metadata) => {
	            options = constructor.prototype.__view__option__ = $.extend(true, constructor.prototype.__view__option__, options);
	            var viewType;
	            exports.registeredView.push(viewType = {
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
	                service_1.Service({
	                    key: key,
	                    registerable: false,
	                    initialize: (view) => {
	                        var binding = viewType.binding;
	                        view && view.initialize && view.initialize();
	                        viewType && (view.__elt__ = viewType.html.then(template => {
	                            var t = $(template);
	                            t.attr("artist-view", true);
	                            foreach(binding, (valueAccessor, selector) => {
	                                (selector.trim() === "this" && t || t.find(selector)).each((i, el) => {
	                                    var binder = valueAccessor(view);
	                                    var binders = binder && !(binder instanceof Array) && [binder] || binder;
	                                    binders.forEach(b => new BindManager(el, service_1.serviceProvider).manage(b));
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
	        define('src/service/viewProvider.js', ["require", "exports", "../core/service", "../service/serviceProvider", "../core/view"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    const service_1 = require("../core/service");
	    const serviceProvider_1 = require("../service/serviceProvider");
	    const view_1 = require("../core/view");
	    class IViewProvider {
	    }
	    exports.IViewProvider = IViewProvider;
	    let ViewProvider = class ViewProvider {
	        constructor(_serviceProvider) {
	            this._serviceProvider = _serviceProvider;
	        }
	        newInstance(type, arg) {
	            var viewType = type && view_1.registeredView.filter((view) => (view.construct.prototype instanceof type) || (type === view.construct))[0];
	            var view = viewType && (this._serviceProvider && service_1.config.getService(viewType.construct) && this._serviceProvider.createService(viewType.construct) || new viewType.construct());
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
	        service_1.Service({
	            key: IViewProvider
	        }),
	        __metadata("design:paramtypes", [serviceProvider_1.IServiceProvider])
	    ], ViewProvider);
	    exports.ViewProvider = ViewProvider;
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
	        return tmp.filter(_ => _ !== ".").join("/");
	    };
	    var getAbsoluteUri = (uri, context) => {
	        var match = false;
	        if (configuration && configuration.path) {
	            configuration.path.some(path => {
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
	                    script.src = src;
	                    script.async = true;
	                    document.head.appendChild(script);
	                    script.onload = script.onreadystatechange = () => {
	                        allmodules[src] = allmodules["..."]["..."];
	                        allmodules["..."] = {};
	                        allmodules[src] = allmodules[src] && allmodules[src](src).then(module => { resolve(loadedmodules[src] = module); return module; }) || resolve();
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
	        define('src/service/notifier.js', ["require", "exports", "../core/service"], factory);
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
	
	(function (factory) {
	    if (typeof module === "object" && typeof module.exports === "object") {
	        var v = factory(require, exports);
	        if (v !== undefined) module.exports = v;
	    }
	    else if (typeof define === "function" && define.amd) {
	        define('src/directive/view.js', ["require", "exports", "node_modules/jquery/dist/jquery", "../service/viewProvider"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    const $ = require("node_modules/jquery/dist/jquery");
	    const viewProvider_1 = require("../service/viewProvider");
	    function view(valueAccessor, callback) {
	        return (element, serviceProvider) => {
	            var $element = $(element);
	            $element.html("");
	            return () => {
	                var value = valueAccessor();
	                var array = !value || value instanceof Array ? (value || []) : [value];
	                var $deleted = $("<div>");
	                var $added = $("<div>");
	                Promise.all(array.map((item) => serviceProvider.getService(viewProvider_1.IViewProvider).getNode(item)))
	                    .then((elts) => {
	                    $element.children().each((i, el) => {
	                        $(el).appendTo($deleted);
	                    });
	                    elts.forEach((el) => {
	                        $element.append(el);
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
	        define('src/directive/dom.js', ["require", "exports", "node_modules/jquery/dist/jquery"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    const $ = require("node_modules/jquery/dist/jquery");
	    function dom(option) {
	        return (element, serviceProvider) => {
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
	        define('src/directive/attr.js', ["require", "exports", "node_modules/jquery/dist/jquery"], factory);
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
	
	(function (factory) {
	    if (typeof module === "object" && typeof module.exports === "object") {
	        var v = factory(require, exports);
	        if (v !== undefined) module.exports = v;
	    }
	    else if (typeof define === "function" && define.amd) {
	        define('src/directive/change.js', ["require", "exports", "node_modules/jquery/dist/jquery"], factory);
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
	
	(function (factory) {
	    if (typeof module === "object" && typeof module.exports === "object") {
	        var v = factory(require, exports);
	        if (v !== undefined) module.exports = v;
	    }
	    else if (typeof define === "function" && define.amd) {
	        define('src/directive/click.js', ["require", "exports", "node_modules/jquery/dist/jquery"], factory);
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
	
	(function (factory) {
	    if (typeof module === "object" && typeof module.exports === "object") {
	        var v = factory(require, exports);
	        if (v !== undefined) module.exports = v;
	    }
	    else if (typeof define === "function" && define.amd) {
	        define('src/directive/text.js', ["require", "exports", "node_modules/jquery/dist/jquery"], factory);
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
	
	(function (factory) {
	    if (typeof module === "object" && typeof module.exports === "object") {
	        var v = factory(require, exports);
	        if (v !== undefined) module.exports = v;
	    }
	    else if (typeof define === "function" && define.amd) {
	        define('src/directive/value.js', ["require", "exports", "node_modules/jquery/dist/jquery"], factory);
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
	
	(function (factory) {
	    if (typeof module === "object" && typeof module.exports === "object") {
	        var v = factory(require, exports);
	        if (v !== undefined) module.exports = v;
	    }
	    else if (typeof define === "function" && define.amd) {
	        define('src/directive/options.js', ["require", "exports", "node_modules/jquery/dist/jquery"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    const $ = require("node_modules/jquery/dist/jquery");
	    function options(valueAccessor) {
	        return (element) => {
	            var $element = $(element);
	            $element.html("");
	            return () => {
	                var value = valueAccessor();
	                $element.html("");
	                $element.append(value.map((item) => {
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
	
	(function (factory) {
	    if (typeof module === "object" && typeof module.exports === "object") {
	        var v = factory(require, exports);
	        if (v !== undefined) module.exports = v;
	    }
	    else if (typeof define === "function" && define.amd) {
	        define('src/directive/each.js', ["require", "exports", "node_modules/jquery/dist/jquery", "../core/view"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    const $ = require("node_modules/jquery/dist/jquery");
	    const view_1 = require("../core/view");
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
	    function each(valueAccessor) {
	        return (element, serviceProvider) => {
	            var $element = $(element), template = $element.html();
	            $element.html("");
	            return () => {
	                var value = valueAccessor();
	                $element.html("");
	                value.forEach((item) => {
	                    var t = $(template);
	                    foreach(item, (valueAccessor, selector) => {
	                        (selector.trim() === "this" && t || t.find(selector)).each((i, el) => {
	                            new view_1.BindManager(el, serviceProvider).manage(valueAccessor);
	                        });
	                    });
	                    $element.append(t);
	                });
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
	        define('src/directive/class.js', ["require", "exports", "node_modules/jquery/dist/jquery"], factory);
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
	
	(function (factory) {
	    if (typeof module === "object" && typeof module.exports === "object") {
	        var v = factory(require, exports);
	        if (v !== undefined) module.exports = v;
	    }
	    else if (typeof define === "function" && define.amd) {
	        define('src/core/index.js', ["require", "exports", "./service", "../service/viewProvider", "node_modules/amd-loader/src/index", "node_modules/jquery/dist/jquery", "node_modules/amd-loader/src/index", "./view", "./service", "../service/serviceProvider", "../service/notifier", "../service/viewProvider", "../service/observalizer", "../directive/view", "../directive/dom", "../directive/attr", "../directive/change", "../directive/click", "../directive/text", "../directive/value", "../directive/options", "../directive/each", "../directive/class"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    function __export(m) {
	        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	    Object.defineProperty(exports, "__esModule", { value: true });
	    const service_1 = require("./service");
	    const viewProvider_1 = require("../service/viewProvider");
	    const index_1 = require("node_modules/amd-loader/src/index");
	    const $ = require("node_modules/jquery/dist/jquery");
	    var index_2 = require("node_modules/amd-loader/src/index");
	    exports.load = index_2.load;
	    var view_1 = require("./view");
	    exports.View = view_1.View;
	    var service_2 = require("./service");
	    exports.Service = service_2.Service;
	    var serviceProvider_1 = require("../service/serviceProvider");
	    exports.IServiceProvider = serviceProvider_1.IServiceProvider;
	    exports.ServiceProvider = serviceProvider_1.ServiceProvider;
	    var notifier_1 = require("../service/notifier");
	    exports.INotifier = notifier_1.INotifier;
	    exports.Notifier = notifier_1.Notifier;
	    exports.Event = notifier_1.Event;
	    var viewProvider_2 = require("../service/viewProvider");
	    exports.IViewProvider = viewProvider_2.IViewProvider;
	    exports.ViewProvider = viewProvider_2.ViewProvider;
	    var observalizer_1 = require("../service/observalizer");
	    exports.IObservablizer = observalizer_1.IObservablizer;
	    exports.Observablizer = observalizer_1.Observablizer;
	    __export(require("../directive/view"));
	    __export(require("../directive/dom"));
	    __export(require("../directive/attr"));
	    __export(require("../directive/change"));
	    __export(require("../directive/click"));
	    __export(require("../directive/text"));
	    __export(require("../directive/value"));
	    __export(require("../directive/options"));
	    __export(require("../directive/each"));
	    __export(require("../directive/class"));
	    /** @description Startup du framework pour lancer l'application.
	     * @param {selector} string sélecteur css pour cibler l'élément du DOM root de l'application.
	     * @param {view} class vue qui sera instanciée en tant que vue root de l'application.
	     * @return
	     */
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
	        var viewProvider = service_1.serviceProvider.getService(viewProvider_1.IViewProvider);
	        viewProvider.getNode(viewProvider.newInstance(view)).then((el) => $(selector).append(el));
	    }
	    exports.startup = startup;
	    if (typeof __META__ === "undefined" || __META__.MODE !== "AMD") {
	        var scripts = document.getElementsByTagName('script');
	        var script = scripts[scripts.length - 1];
	        var configFileName = script.getAttribute("config");
	        var mainFileName = script.getAttribute("startup");
	        var placeHolder = script.getAttribute("placeholder");
	        index_1.define(script.src, [], () => { return exports; })();
	        placeHolder && ((configFileName && index_1.load(configFileName).then((conf) => index_1.config(conf && conf.default || {})) || Promise.resolve())
	            .then(() => (mainFileName && index_1.load(mainFileName) || Promise.resolve(null)).then(modules => {
	            var clss = modules && modules[Object.keys(modules).filter(_ => _.indexOf("_") !== 0)[0]];
	            clss && startup(placeHolder, clss);
	        })));
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
