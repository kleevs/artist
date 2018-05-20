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
	    /** @description Interface du service fournisseur de service.
	     */
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
	            if (callback instanceof Array) {
	                callback.forEach(c => this.manage(c));
	            }
	            else {
	                var fn = callback(this.element, this.data);
	                index_1.blind(() => index_1.observer(() => fn()));
	            }
	        }
	    }
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
	        define('src/service/configManager.js', ["require", "exports", "../core/service"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    const service_1 = require("../core/service");
	    class IConfigManager {
	    }
	    exports.IConfigManager = IConfigManager;
	    let ConfigManager = class ConfigManager extends IConfigManager {
	        setConfig(config) {
	            this._config = config;
	        }
	        getConfig() {
	            return this._config;
	        }
	    };
	    ConfigManager = __decorate([
	        service_1.Service({
	            key: IConfigManager
	        })
	    ], ConfigManager);
	    exports.ConfigManager = ConfigManager;
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
	        define('src/service/ajax.js', ["require", "exports", "../core/service", "../service/configManager"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    const service_1 = require("../core/service");
	    const configManager_1 = require("../service/configManager");
	    class IAjax {
	    }
	    exports.IAjax = IAjax;
	    let Ajax = class Ajax extends IAjax {
	        constructor(configManager) {
	            super();
	            this.configManager = configManager;
	        }
	        ajax(options) {
	            return new Promise((resolve, reject) => {
	                var xhr = this.getXMLHttpRequest();
	                var configuration = this.configManager.getConfig();
	                var url = options.url;
	                if (configuration && configuration.path) {
	                    configuration.path.some(path => {
	                        if (url.match(path.test)) {
	                            url = url.replace(path.test, path.result);
	                            return true;
	                        }
	                    });
	                }
	                xhr.open(options.method || 'GET', url, true);
	                options.headers && Object.keys(options.headers).forEach(key => {
	                    xhr.setRequestHeader(key, options.headers[key]);
	                });
	                xhr.send(options.data);
	                xhr.onreadystatechange = () => {
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
	        }
	        getXMLHttpRequest() {
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
	        }
	    };
	    Ajax = __decorate([
	        service_1.Service({
	            key: IAjax
	        }),
	        __metadata("design:paramtypes", [configManager_1.IConfigManager])
	    ], Ajax);
	    exports.Ajax = Ajax;
	});
	
	(function (factory) {
	    if (typeof module === "object" && typeof module.exports === "object") {
	        var v = factory(require, exports);
	        if (v !== undefined) module.exports = v;
	    }
	    else if (typeof define === "function" && define.amd) {
	        define('src/core/view.js', ["require", "exports", "../lib/binder/index", "../lib/dom/index", "./service", "../service/ajax"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    const index_1 = require("../lib/binder/index");
	    const index_2 = require("../lib/dom/index");
	    const service_1 = require("./service");
	    const ajax_1 = require("../service/ajax");
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
	    /** @description Classe permettant de lier une partie du DOM à un binder
	     */
	    class BindManager extends index_1.BindManager {
	        constructor(element, data = undefined) {
	            super(element, data);
	        }
	        /** @description Applique le lien entre l'élément du DOM et le binder.
	         * @param {callback} Binder Binder à lier.
	         * @return void
	         */
	        manage(callback) {
	            super.manage(callback);
	        }
	    }
	    exports.BindManager = BindManager;
	    exports.registeredView = [];
	    function View(options) {
	        return (constructor, metadata) => {
	            options = constructor.prototype.__view__option__ = Object.assign({}, constructor.prototype.__view__option__, options);
	            var viewType;
	            exports.registeredView.push(viewType = {
	                construct: constructor,
	                binding: options.binding,
	                html: new Promise((resolve, reject) => {
	                    options.html && resolve(options.html);
	                    options.template && !options.html && (() => {
	                        service_1.serviceProvider.getService(ajax_1.IAjax).ajax({ url: `/${options.template}`, method: 'GET' }).then((response) => {
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
	                    initialize: (view) => {
	                        var binding = viewType.binding;
	                        view && view.initialize && view.initialize();
	                        viewType && (view.__elt__ = viewType.html.then(template => {
	                            var t = index_2.createElement(template);
	                            t.setAttribute("artist-view", "true");
	                            foreach(binding, (valueAccessor, selector) => {
	                                (selector.trim() === "this" && [t] || t.querySelectorAll(selector)).forEach((el) => {
	                                    var binder = valueAccessor(view);
	                                    var binders = binder && !(binder instanceof Array) && [binder] || binder;
	                                    binders.forEach(b => new BindManager(el, service_1.serviceProvider).manage(b));
	                                });
	                            });
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
	        define('src/service/viewProvider.js', ["require", "exports", "../core/service", "../service/serviceProvider", "../core/view"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    const service_1 = require("../core/service");
	    const serviceProvider_1 = require("../service/serviceProvider");
	    const view_1 = require("../core/view");
	    /** @description Interface du service fournisseur de vue.
	     */
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
	        define('src/lib/amd-loader/index.js', ["require", "exports"], factory);
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
	    /** @description Interface du service gérant la communication entre vue.
	     */
	    class INotifier {
	    }
	    exports.INotifier = INotifier;
	    /** @description Classe définissant les évènements à manipuler pour la communication entre vue.
	     */
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
	            return {
	                stop: () => {
	                    var index = callbacks.indexOf(callback);
	                    if (index > -1) {
	                        callbacks.splice(index, 1);
	                    }
	                }
	            };
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
	        define('src/service/moduleProvider.js', ["require", "exports", "../core/service", "../lib/amd-loader/index"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    const service_1 = require("../core/service");
	    const index_1 = require("../lib/amd-loader/index");
	    class IModuleProvider {
	    }
	    exports.IModuleProvider = IModuleProvider;
	    let ModuleProvider = class ModuleProvider extends IModuleProvider {
	        constructor() {
	            super();
	        }
	        get(uri) {
	            return index_1.load(`/${uri}`);
	        }
	    };
	    ModuleProvider = __decorate([
	        service_1.Service({
	            key: IModuleProvider
	        }),
	        __metadata("design:paramtypes", [])
	    ], ModuleProvider);
	    exports.ModuleProvider = ModuleProvider;
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
	        define('src/service/router.js', ["require", "exports", "../core/service", "../service/configManager"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    const service_1 = require("../core/service");
	    const configManager_1 = require("../service/configManager");
	    class IRouter {
	    }
	    exports.IRouter = IRouter;
	    let Router = class Router extends IRouter {
	        constructor(configManager) {
	            super();
	            this.configManager = configManager;
	            this._callbacks = [];
	            window.onpopstate = (state) => this.change(location.href);
	        }
	        on(callback) {
	            var parsed = this.parse(location.href);
	            callback(parsed.href, parsed.pathname, parsed.hash);
	            this._callbacks.push(callback);
	        }
	        trigger(href) {
	            history.pushState({}, '', href);
	            this.change(href);
	        }
	        change(str) {
	            var parsed = this.parse(str);
	            this._callbacks.forEach(callback => callback(parsed.href, parsed.pathname, parsed.hash));
	        }
	        parse(href) {
	            var a = document.createElement('a');
	            a.href = href;
	            return a;
	        }
	        getUrl(localUri) {
	            var configuration = this.configManager.getConfig();
	            var url = localUri;
	            if (configuration && configuration.path) {
	                configuration.path.some(path => {
	                    if (url.match(path.test)) {
	                        url = url.replace(path.test, path.result);
	                        return true;
	                    }
	                });
	            }
	            return url;
	        }
	    };
	    Router = __decorate([
	        service_1.Service({
	            key: IRouter
	        }),
	        __metadata("design:paramtypes", [configManager_1.IConfigManager])
	    ], Router);
	    exports.Router = Router;
	});
	
	(function (factory) {
	    if (typeof module === "object" && typeof module.exports === "object") {
	        var v = factory(require, exports);
	        if (v !== undefined) module.exports = v;
	    }
	    else if (typeof define === "function" && define.amd) {
	        define('src/directive/view.js', ["require", "exports", "../service/viewProvider", "../lib/dom/index"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    const viewProvider_1 = require("../service/viewProvider");
	    const index_1 = require("../lib/dom/index");
	    function view(valueAccessor, callback) {
	        return (element, serviceProvider) => {
	            element.innerHTML = "";
	            return () => {
	                var value = valueAccessor();
	                var array = !value || value instanceof Array ? (value || []) : [value];
	                var deleted = index_1.createElement("<div></div>");
	                var added = index_1.createElement("<div></div>");
	                var promises = array.map((item) => serviceProvider.getService(viewProvider_1.IViewProvider).getNode(item));
	                Promise.all(promises)
	                    .then((elts) => {
	                    element.childNodes.forEach((el) => {
	                        deleted.appendChild(el);
	                    });
	                    elts.forEach((el) => {
	                        element.appendChild(el);
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
	        return (element) => {
	            element.addEventListener(event, (e) => {
	                var stopPropagation = valueAccessor().call(element, e);
	                stopPropagation && e.stopPropagation();
	            });
	            return () => { };
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
	    const on_1 = require("on");
	    function dom(option) {
	        return [
	            on_1.on('custom:view:dom:remove', () => (e) => {
	                if (e.target === e.currentTarget) {
	                    option.out(e);
	                    return true;
	                }
	                return false;
	            }),
	            on_1.on('custom:view:dom:added', () => (e) => {
	                if (e.target === e.currentTarget) {
	                    option.in(e);
	                    return true;
	                }
	                return false;
	            })
	        ];
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
	        return (element) => {
	            return () => {
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
	    const on_1 = require("on");
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
	    const on_1 = require("on");
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
	        return (element) => {
	            return () => {
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
	    const on_1 = require("on");
	    function value(options) {
	        return [
	            on_1.on(options.on || 'input', () => (e) => {
	                var target = e.currentTarget;
	                var value = target.value;
	                if (target.type == "checkbox") {
	                    value = target.checked;
	                }
	                options.set(value);
	                return true;
	            }),
	            (element) => () => {
	                var value = options.get();
	                if (element.type == "checkbox") {
	                    element.checked = value;
	                }
	                else {
	                    element.value = value || '';
	                }
	            }
	        ];
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
	    const index_1 = require("../lib/dom/index");
	    function options(valueAccessor) {
	        return (element) => {
	            element.innerHTML = "";
	            return () => {
	                var value = valueAccessor();
	                element.innerHTML = "";
	                value.map((item) => {
	                    var opt = index_1.createElement("<option></option>");
	                    opt.value = item.id;
	                    opt.textContent = item.text;
	                    return opt;
	                }).forEach(o => element.appendChild(o));
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
	    const view_1 = require("../core/view");
	    const index_1 = require("../lib/dom/index");
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
	            var template = element.innerHTML;
	            element.innerHTML = "";
	            return () => {
	                var value = valueAccessor();
	                element.innerHTML = "";
	                value.map((item) => {
	                    var t = index_1.createElement(template);
	                    foreach(item, (valueAccessor, selector) => {
	                        (selector.trim() === "this" && [t] || t.querySelectorAll(selector)).forEach((el, i) => {
	                            new view_1.BindManager(el, serviceProvider).manage(valueAccessor);
	                        });
	                    });
	                    return t;
	                }).forEach(el => element.appendChild(el));
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
	        arr = arr.filter(name => name !== className);
	        element.className = arr.join(' ');
	    }
	    function classes(valueAccessor) {
	        return (element) => {
	            return () => {
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
	    const router_1 = require("../service/router");
	    function router() {
	        return (element, serviceProvider) => {
	            document.body.addEventListener("click", (e) => {
	                var target = e.target;
	                if (target.tagName.toLowerCase() === 'a') {
	                    var href = target.pathname;
	                    serviceProvider.getService(router_1.IRouter).trigger(href);
	                    e.preventDefault();
	                    return false;
	                }
	            });
	            return () => {
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
	        define('src/core/index.js', ["require", "exports", "./service", "../service/viewProvider", "../lib/amd-loader/index", "../service/configManager", "../lib/amd-loader/index", "./view", "./service", "../service/serviceProvider", "../service/notifier", "../service/viewProvider", "../service/observalizer", "../service/moduleProvider", "../service/router", "../service/ajax", "../service/configManager", "../directive/view", "../directive/on", "../directive/dom", "../directive/attr", "../directive/change", "../directive/click", "../directive/text", "../directive/value", "../directive/options", "../directive/each", "../directive/class", "../directive/router"], factory);
	    }
	})(function (require, exports) {
	    "use strict";
	    function __export(m) {
	        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	    Object.defineProperty(exports, "__esModule", { value: true });
	    const service_1 = require("./service");
	    const viewProvider_1 = require("../service/viewProvider");
	    const index_1 = require("../lib/amd-loader/index");
	    const configManager_1 = require("../service/configManager");
	    var index_2 = require("../lib/amd-loader/index");
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
	        var observer = new MutationObserver((records) => {
	            records.forEach(record => {
	                var removedNodes = Array.prototype.map.call(record.removedNodes, x => x);
	                var addedNodes = Array.prototype.map.call(record.addedNodes, x => x);
	                removedNodes.forEach(e => e.dispatchEvent(new Event("custom:view:dom:remove")));
	                addedNodes.forEach(e => e.dispatchEvent(new Event("custom:view:dom:added")));
	            });
	        });
	        observer.observe(document.querySelector("body"), { childList: true, subtree: true });
	        var viewProvider = service_1.serviceProvider.getService(viewProvider_1.IViewProvider);
	        viewProvider.getNode(viewProvider.newInstance(view)).then((el) => document.querySelector(selector).appendChild(el));
	    }
	    exports.startup = startup;
	    if (typeof __META__ === "undefined" || __META__.MODE !== "AMD") {
	        var scripts = document.getElementsByTagName('script');
	        var script = scripts[scripts.length - 1];
	        var configFileName = script.getAttribute("config");
	        var mainFileName = script.getAttribute("startup");
	        var placeHolder = script.getAttribute("placeholder");
	        index_1.define(script.src, [], () => { return exports; })();
	        placeHolder && ((configFileName && index_1.load(configFileName).then((conf) => {
	            service_1.serviceProvider.getService(configManager_1.IConfigManager).setConfig(conf.default);
	            index_1.config(conf && conf.default || {});
	        }) || Promise.resolve())
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
