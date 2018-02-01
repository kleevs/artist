var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};(function template(factory, root) {
        if (typeof module === "object" && typeof module.exports === "object") {
            var v = factory(require);
            if (v !== undefined)
                module.exports = v;
        }
        else if (typeof define === "function" && define.amd) {
            define(["require"], (require) => factory(require));
        }
        else {
            factory(null, root);
        }
    })(function anonymous(req
/**/) {
class Resolver {
        constructor(paths = {}) {
            this.paths = paths;
        }
        resolve(path, uri) {
            var paths = this.paths;
            path = (path ? [path] : []).concat([uri]).join("/");
            var array = (path || "").replace(/\\/gi, "/").split("/");
            var i;
            uri = uri.replace(/\\/gi, "/");
            for (i in paths) {
                if (uri.indexOf(`${i}/`) === 0) {
                    return uri.replace(i, paths[i]);
                }
            }
            for (i = 0; i < array.length; i++) {
                if (!array[i] && i > 0)
                    array.splice(i, 1) && i--;
                else if (array[i] === ".")
                    array.splice(i, 1) && i--;
                else if (array[i] === ".." && i > 0 && array[i - 1] !== ".." && array[i - 1])
                    array.splice(i - 1, 2) && (i -= 2);
            }
            return array.join("/");
        }
    }
var resolver = new Resolver({"node_modules":"node_modules"});
var names = ["node_modules/observable/src/core","node_modules/observable/src/observable","node_modules/observable/src/observer","node_modules/observable/src/blind","node_modules/observable/src/index","node_modules/reflect-decorator/src/index","node_modules/dependency-injection/src/index","src/mixin","src/service","node_modules/binder/src/binder","node_modules/jquery/dist/jquery","node_modules/binder/src/handler/attr","node_modules/binder/src/handler/change","node_modules/binder/src/handler/click","node_modules/binder/src/handler/text","node_modules/binder/src/handler/value","node_modules/binder/src/handler/base/mixin","node_modules/binder/src/handler/options","node_modules/binder/src/handler/each","node_modules/binder/src/handler/class","node_modules/binder/src/handlers","node_modules/binder/src/index","src/view","src/istartup","src/index"]
var res = [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}];
var require = function(currentPath, name) { var n = resolver.resolve(currentPath, name); return names.indexOf(n) >= 0 && res[names.indexOf(n)] || req(name); }
res[0] = (function (require, exports) {
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
})(require.bind(null, "node_modules/observable/src/"),res[0]) || res[0];
res[1] = (function (require, exports) {
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
})(require.bind(null, "node_modules/observable/src/"),res[1],res[0]) || res[1];
res[2] = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const core_1 = require("./core");
    function create(fn) {
        return core_1.observer(fn);
    }
    exports.create = create;
})(require.bind(null, "node_modules/observable/src/"),res[2],res[0]) || res[2];
res[3] = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const core_1 = require("./core");
    function create(fn) {
        return core_1.blind(fn);
    }
    exports.create = create;
})(require.bind(null, "node_modules/observable/src/"),res[3],res[0]) || res[3];
res[4] = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var observable_1 = require("./observable");
    exports.observable = observable_1.create;
    var observer_1 = require("./observer");
    exports.observer = observer_1.create;
    var blind_1 = require("./blind");
    exports.blind = blind_1.create;
})(require.bind(null, "node_modules/observable/src/"),res[4],res[1],res[2],res[3]) || res[4];
res[5] = (function (require, exports) {
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
})(require.bind(null, "node_modules/reflect-decorator/src/"),res[5]) || res[5];
res[6] = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    require("node_modules/reflect-decorator/src/index");
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
    function grep(array, predicate) {
        let i, res = [];
        for (i = 0; i < array.length; i++) {
            if (predicate(array[i], i))
                res.push(array[i]);
        }
        return res;
    }
    function map(array, parse) {
        let res = [];
        foreach(array, (x) => { res.push(parse(x)); return false; });
        return res;
    }
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
            return data.value ? (param.length <= 0 ? new data.value() : new (data.value.bind.apply(data.value, [null].concat(param)))()) : undefined;
        }
        createService(key, parameters) {
            let service = this._config.getService(key);
            service = service || { value: key, parameters: [] };
            parameters && (service.parameters = parameters);
            return this.create(service);
        }
        getService(key) {
            var result = map(grep(this._register, (item) => item.key === key), (item) => item.value)[0];
            result || this._register.push({ key: key, value: (result = this.createService(key)) });
            return result;
        }
    }
    class Config extends IConfig {
        constructor() {
            super();
            this._register = [];
        }
        addService(key, value, parameters) {
            this._register.unshift({ key: key, value: value, parameters: parameters });
        }
        getService(key) {
            return map(grep(this._register, (item) => item.key === key), (item) => {
                return { value: item.value, parameters: item.parameters };
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
                    this._config.addService(options.interface, target, metadata && metadata["design:paramtypes"] || []);
                };
                return res;
            };
        }
    }
    exports.DependencyInjector = DependencyInjector;
})(require.bind(null, "node_modules/dependency-injection/src/"),res[6],res[5]) || res[6];
res[7] = (function (require, exports) {
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
})(require.bind(null, "src/"),res[7]) || res[7];
res[8] = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const index_1 = require("node_modules/observable/src/index");
    const index_2 = require("node_modules/dependency-injection/src/index");
    const mixin_1 = require("./mixin");
    var injector = new index_2.DependencyInjector();
    exports.config = injector.getConfig();
    exports.serviceProvider = injector.getProvider();
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
        forEvent(event) {
            return {
                listen: (obj, callback) => this.listen(obj, event.key, callback),
                notify: (obj, value) => this.notify(obj, event.key, value)
            };
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
})(require.bind(null, "src/"),res[8],res[4],res[6],res[7]) || res[8];
res[9] = (function (require, exports) {
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
})(require.bind(null, "node_modules/binder/src/"),res[9],res[4]) || res[9];
res[10] = (function anonymous() {
return $;
})() || res[10];
res[11] = (function (require, exports) {
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
})(require.bind(null, "node_modules/binder/src/handler/"),res[11],res[10]) || res[11];
res[12] = (function (require, exports) {
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
})(require.bind(null, "node_modules/binder/src/handler/"),res[12],res[10]) || res[12];
res[13] = (function (require, exports) {
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
})(require.bind(null, "node_modules/binder/src/handler/"),res[13],res[10]) || res[13];
res[14] = (function (require, exports) {
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
})(require.bind(null, "node_modules/binder/src/handler/"),res[14],res[10]) || res[14];
res[15] = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const $ = require("node_modules/jquery/dist/jquery");
    function value(valueAccessor) {
        return (element) => {
            var $element = $(element);
            $element.change(() => {
                valueAccessor.set($element.val());
            });
            return () => {
                var value = valueAccessor.get();
                $element.val(value);
            };
        };
    }
    exports.value = value;
})(require.bind(null, "node_modules/binder/src/handler/"),res[15],res[10]) || res[15];
res[16] = (function (require, exports) {
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
})(require.bind(null, "node_modules/binder/src/handler/base/"),res[16]) || res[16];
res[17] = (function (require, exports) {
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
})(require.bind(null, "node_modules/binder/src/handler/"),res[17],res[16],res[10]) || res[17];
res[18] = (function (require, exports) {
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
})(require.bind(null, "node_modules/binder/src/handler/"),res[18],res[10],res[9],res[16]) || res[18];
res[19] = (function (require, exports) {
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
})(require.bind(null, "node_modules/binder/src/handler/"),res[19],res[10]) || res[19];
res[20] = (function (require, exports) {
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
})(require.bind(null, "node_modules/binder/src/"),res[20],res[11],res[12],res[13],res[14],res[15],res[17],res[18],res[19]) || res[20];
res[21] = (function (require, exports) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(require("node_modules/observable/src/index"));
    __export(require("./binder"));
    __export(require("./handlers"));
})(require.bind(null, "node_modules/binder/src/"),res[21],res[4],res[9],res[20]) || res[21];
res[22] = (function (require, exports) {
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
            registeredView.push({
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
        };
    }
    exports.View = View;
    class IViewProvider {
    }
    exports.IViewProvider = IViewProvider;
    let ViewProvider = class ViewProvider {
        newInstance(type, arg) {
            var viewType = type && mixin_1.grep(registeredView, (view) => view.construct.prototype instanceof type || type === view.construct)[0];
            var view = viewType && (service_1.serviceProvider && service_1.config.getService(viewType.construct) && service_1.serviceProvider.createService(viewType.construct) || new viewType.construct());
            var binding = viewType.binding;
            view && view.initialize && view.initialize(arg);
            viewType && (view.__elt__ = viewType.html.then(template => {
                var t = $(template);
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
            interface: IViewProvider
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
                        el.__view__parent = false;
                        $(el).appendTo($deleted);
                    });
                    return elts;
                }).then((elts) => {
                    elts.forEach((el) => {
                        $element.append(el);
                        el.__view__added = el.__view__parent !== false;
                        el.__view__parent = element;
                    });
                    return elts;
                })
                    .then((elts) => {
                    $deleted.children().each((i, el) => {
                        el.__view__parent = undefined;
                        $(el).trigger("custom:view:remove", { from: element });
                    });
                    return elts;
                })
                    .then((elts) => {
                    elts.forEach((el) => {
                        if (el.__view__added) {
                            $(el).trigger("custom:view:add", { into: element });
                        }
                        delete el.__view__added;
                    });
                    return elts;
                });
            };
        };
    }
    exports.view = view;
})(require.bind(null, "src/"),res[22],res[21],res[8],res[7],res[10]) || res[22];
res[23] = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const index_1 = require("node_modules/observable/src/index");
    const $ = require("node_modules/jquery/dist/jquery");
    const view_1 = require("./view");
    const service_1 = require("./service");
    let StartView = class StartView {
        constructor(_viewProvider) {
            this._viewProvider = _viewProvider;
            this.view = index_1.observable();
        }
        renderView(type) {
            return new Promise((resolve) => {
                var v = this._viewProvider.newInstance(type);
                this.view(v);
                v && this._viewProvider.getNode(v).then((element) => {
                    resolve(v);
                }) || resolve(v);
            });
        }
    };
    StartView = __decorate([
        view_1.View({
            html: "<div></div>",
            binding: {
                "this": (startView) => view_1.view(() => startView.view())
            }
        }),
        __metadata("design:paramtypes", [view_1.IViewProvider])
    ], StartView);
    ;
    let StartService = class StartService extends StartView {
        constructor(viewProvider) {
            super(viewProvider);
        }
    };
    StartService = __decorate([
        service_1.Service({
            interface: StartView
        }),
        __metadata("design:paramtypes", [view_1.IViewProvider])
    ], StartService);
    class IStartUp {
        constructor(_selector) {
            this._selector = _selector;
            var viewProvider = service_1.serviceProvider.getService(view_1.IViewProvider);
            viewProvider.getNode(this._starter = viewProvider.newInstance(StartView)).then((el) => $(_selector).append(el));
        }
        renderView(type) {
            return this._starter.renderView(type);
        }
    }
    exports.IStartUp = IStartUp;
})(require.bind(null, "src/"),res[23],res[4],res[10],res[22],res[8]) || res[23];
return res[24] = (function (require, exports) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    const service_1 = require("./service");
    __export(require("node_modules/binder/src/index"));
    __export(require("node_modules/dependency-injection/src/index"));
    __export(require("./istartup"));
    __export(require("./view"));
    __export(require("./service"));
    function startup(starter) {
        var context = window;
        var startup = new starter();
        startup && startup.onStart && startup.onStart(service_1.config);
        startup && startup.onHashChange && context.addEventListener("hashchange", () => {
            startup.onHashChange(location.hash, location.href);
        }, false);
        startup && startup.onHashChange && startup.onHashChange(location.hash, location.href);
    }
    exports.startup = startup;
})(require.bind(null, "src/"),res[24],res[8],res[21],res[6],res[23],res[22],res[8]) || res[24];
}, typeof window !== 'undefined' && (window.Artist = {}) || {})