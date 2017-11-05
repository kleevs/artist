(function (factory) {
	var modules = Array.prototype.slice.call(arguments, 1);
	var req = function(id) { return modules[id] || require && require.apply(this, arguments); };
    var def = function(id, module) { 
		modules[id] = module; 
	};
	
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(def, req, modules, require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory.bind(def, req, modules));
    } 
	else {
		window.Artist = factory(def, req, modules, null, window.Artist = {}) || window.Artist;
	}
})(function (define, req, modules, require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
	var mod_1; define('mod_1', modules[0]() || mod_1);
    var mod_2; define('mod_2', modules[1](req, mod_2 = {}) || mod_2);
    var mod_3; define('mod_3', modules[2](req, mod_3 = {}) || mod_3);
    var mod_4; define('mod_4', modules[3](req, mod_4 = {}) || mod_4);
    var mod_5; define('mod_5', modules[4](req, mod_5 = {}, req("mod_3")) || mod_5);
    var mod_6; define('mod_6', modules[5](req, mod_6 = {}, req("mod_2")) || mod_6);
    var mod_7; define('mod_7', modules[6](req, mod_7 = {}, req("mod_4"), req("mod_1")) || mod_7);
    var mod_8; define('mod_8', modules[7](req, mod_8 = {}, req("mod_4"), req("mod_1")) || mod_8);
    var mod_9; define('mod_9', modules[8](req, mod_9 = {}, req("mod_4"), req("mod_1")) || mod_9);
    var mod_10; define('mod_10', modules[9](req, mod_10 = {}, req("mod_4"), req("mod_1")) || mod_10);
    var mod_11; define('mod_11', modules[10](req, mod_11 = {}, req("mod_4"), req("mod_1")) || mod_11);
    var mod_12; define('mod_12', modules[11](req, mod_12 = {}) || mod_12);
    var mod_13; define('mod_13', modules[12](req, mod_13 = {}, req("mod_5")) || mod_13);
    var mod_14; define('mod_14', modules[13](req, mod_14 = {}, req("mod_4"), req("mod_1"), req("mod_12")) || mod_14);
    var mod_15; define('mod_15', modules[14](req, mod_15 = {}, req("mod_2"), req("mod_4"), req("mod_1"), req("mod_12")) || mod_15);
    var mod_16; define('mod_16', modules[15](req, mod_16 = {}, req("mod_12"), req("mod_4"), req("mod_1")) || mod_16);
    var mod_17; define('mod_17', modules[16](req, mod_17 = {}, req("mod_7"), req("mod_8"), req("mod_9"), req("mod_14"), req("mod_10"), req("mod_11"), req("mod_15"), req("mod_16")) || mod_17);
    var mod_18; define('mod_18', modules[17](req, mod_18 = {}, req("mod_2"), req("mod_4"), req("mod_6"), req("mod_17")) || mod_18);
    var mod_19; define('mod_19', modules[18](req, mod_19 = {}, req("mod_2"), req("mod_18"), req("mod_13"), req("mod_1")) || mod_19);
    var mod_20; define('mod_20', modules[19](req, mod_20 = {}, req("mod_1"), req("mod_19")) || mod_20);
    var mod_21; define('mod_21', modules[20](req, mod_21 = {}, req("mod_18"), req("mod_18"), req("mod_19")) || mod_21);
    var mod_22; define('mod_22', modules[21](req, exports, req("mod_13"), req("mod_2"), req("mod_5"), req("mod_20"), req("mod_19"), req("mod_13"), req("mod_21")) || mod_22);
}, function anonymous() {
return $;
}, function (require, exports) {
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
    function contains(array, item) {
        let res = false;
        foreach(array, (x) => { res = res || item === x; });
        return res;
    }
    let Mode = {
        SILENT: {}
    };
    let firstcall = {};
    let stack = [];
    let computing = { value: 0, deep: 0 };
    let create = (callback) => {
        let listeners = [], observable, value = firstcall;
        observable = function () {
            var newValue, args = arguments, mode = args[0], top = stack[stack.length - 1];
            if (mode === Mode.SILENT) {
                args = args[1];
            }
            if (top !== Mode.SILENT && mode !== Mode.SILENT && args.length <= 0 && stack.length > 0 && !grep(listeners, (item) => item === top)[0]) {
                listeners.push(top);
            }
            if (value != firstcall && mode !== Mode.SILENT && args.length <= 0 && computing.value < computing.deep) {
                return value;
            }
            computing.deep++;
            stack.push(mode === Mode.SILENT ? mode : observable);
            newValue = callback.apply(null, args);
            stack.pop();
            computing.deep--;
            if (value != firstcall && args.length > 0 || newValue !== value && (newValue === newValue || value === value)) {
                value = newValue;
                let tmp = computing.value;
                computing.value = computing.deep;
                listeners.forEach((item) => {
                    item();
                    return false;
                });
                computing.value = tmp;
            }
            return newValue;
        };
        observable.unwrap = () => {
            return callback;
        };
        observable.silent = function () {
            return observable(Mode.SILENT, arguments);
        };
        observable.toJSON = () => {
            return callback();
        };
        observable.isObservable = true;
        return observable;
    };
    function isObservable(value) {
        return value && value.isObservable;
    }
    exports.isObservable = isObservable;
    function wrap(callback) {
        return isObservable(callback) ? callback : create(callback);
    }
    exports.wrap = wrap;
    function unwrap(value) {
        return isObservable(value) ? value.unwrap() : value;
    }
    exports.unwrap = unwrap;
    function object(defaut) {
        let value, res = wrap(function (v) {
            return arguments.length > 0 && (value = v), value;
        });
        res(defaut);
        return res;
    }
    exports.object = object;
    function serialize(value) {
        return JSON.stringify(value);
    }
    exports.serialize = serialize;
}, function (require, exports) {
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
}, function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BindingHandler {
        init(element, valueAccessor, viewModel, context) { }
        update(element, valueAccessor, viewModel, context) { }
    }
    exports.BindingHandler = BindingHandler;
    ;
}, function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    require("mod_3");
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
}, function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const index_1 = require("mod_2");
    class Binder {
        constructor(handlerType, valueAccessor) {
            this.handlerType = handlerType;
            this.valueAccessor = valueAccessor;
        }
        bind(element, viewModel, context) {
            context = context || {};
            var handler = new this.handlerType();
            var valueAccessor = () => this.valueAccessor(viewModel);
            handler.init && handler.init(element, valueAccessor, viewModel, context);
            handler.update && index_1.wrap(() => {
                index_1.wrap(() => {
                    handler.update(element, valueAccessor, viewModel, context);
                })();
            }).silent();
        }
    }
    exports.Binder = Binder;
}, function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const abstract_1 = require("mod_4");
    const $ = require("mod_1");
    class Attr extends abstract_1.BindingHandler {
        update(element, valueAccessor, viewModel) {
            var $element = $(element), value = valueAccessor();
            for (var key in value) {
                $element.attr(key, value[key]);
            }
        }
    }
    exports.Attr = Attr;
}, function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const abstract_1 = require("mod_4");
    const $ = require("mod_1");
    class Change extends abstract_1.BindingHandler {
        init(element, valueAccessor, viewModel, bindingContext) {
            $(element).change((e) => {
                return valueAccessor().call(viewModel, e);
            });
        }
    }
    exports.Change = Change;
    ;
}, function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const abstract_1 = require("mod_4");
    const $ = require("mod_1");
    class Click extends abstract_1.BindingHandler {
        init(element, valueAccessor, viewModel, bindingContext) {
            var $element = $(element);
            $element.click(() => {
                valueAccessor().call(viewModel);
            });
        }
    }
    exports.Click = Click;
    ;
}, function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const abstract_1 = require("mod_4");
    const $ = require("mod_1");
    class Text extends abstract_1.BindingHandler {
        update(element, valueAccessor, model, context) {
            var value = valueAccessor();
            $(element).text(value);
        }
    }
    exports.Text = Text;
    ;
}, function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const abstract_1 = require("mod_4");
    const $ = require("mod_1");
    class Value extends abstract_1.BindingHandler {
        init(element, valueAccessor, model, context) {
            var $element = $(element);
            $element.change(() => {
                valueAccessor()($element.val());
            });
        }
        update(element, valueAccessor, model, context) {
            var $element = $(element);
            var value = valueAccessor()();
            $element.data("value", value);
            $element.val(value);
        }
    }
    exports.Value = Value;
    ;
}, function (require, exports) {
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
}, function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const index_1 = require("mod_5");
    var injector = new index_1.DependencyInjector();
    exports.config = injector.getConfig();
    exports.provider = injector.getProvider();
    exports.Service = injector.getDecorator();
}, function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const abstract_1 = require("mod_4");
    const $ = require("mod_1");
    const mixin_1 = require("mod_12");
    class ForEach extends abstract_1.BindingHandler {
        init(element, valueAccessor, viewModel) {
            var $element = $(element);
            this._template = $element.html();
            $element.html("");
        }
        update(element, valueAccessor, viewModel) {
            var $element = $(element);
            var value = valueAccessor();
            var array = value ? value.array : undefined;
            var config = value ? value.config : undefined;
            var template = this._template;
            if (array) {
                setTimeout(() => {
                    $element.html("");
                    for (var i = 0; i < array.length; i++) {
                        var $template = $(template);
                        mixin_1.foreach(config, (value, key) => {
                            let $el = key.trim() === "this" ? $template : $template.find(key);
                            $el.each((indx, el) => {
                                mixin_1.foreach(value, (binder) => {
                                    binder.bind(el, array[i]);
                                });
                            });
                        });
                        $element.append($template);
                    }
                });
            }
            else {
                $element.html("");
            }
        }
    }
    exports.ForEach = ForEach;
    ;
}, function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const index_1 = require("mod_2");
    const abstract_1 = require("mod_4");
    const $ = require("mod_1");
    const mixin_1 = require("mod_12");
    function bindView($element, bindings, viewmodel, context) {
        var config = [];
        context = context || {};
        context.config = bindings;
        mixin_1.foreach(bindings, (binding, selector) => {
            var $el = selector.trim() === "this" && $element || $element.find(selector);
            config.push({
                $el: $el,
                binding: binding
            });
        });
        mixin_1.foreach(config, (conf) => {
            conf.$el.each((i, el) => {
                if ($element[0] === el || $element.find(el).length > 0) {
                    mixin_1.foreach(conf.binding, (binder) => {
                        binder.bind(el, viewmodel, context);
                    });
                }
            });
        });
    }
    class Htmls extends abstract_1.BindingHandler {
        update(element, valueAccessor, model, context) {
            var $element = $(element);
            var values = valueAccessor();
            index_1.wrap(() => {
                $element.html("");
                values && values.forEach((value) => {
                    if (value) {
                        var $el = $(value.template);
                        bindView($el, value.config, value.model, context);
                        $element.append($el);
                    }
                });
            }).silent();
        }
    }
    exports.Htmls = Htmls;
}, function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const mixin_1 = require("mod_12");
    const abstract_1 = require("mod_4");
    const $ = require("mod_1");
    class Options extends abstract_1.BindingHandler {
        init(element, valueAccessor, model, context) {
            var $element = $(element);
            $element.html("");
        }
        update(element, valueAccessor, model, context) {
            var $element = $(element);
            var value = valueAccessor();
            $element.html("");
            $element.append(mixin_1.map(value, (item) => {
                var $opt = $("<option>");
                $opt.val(item.id);
                $opt.text(item.text);
                return $opt;
            }));
            $element.val($element.data("value"));
        }
    }
    exports.Options = Options;
    ;
}, function (require, exports) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(require("mod_7"));
    __export(require("mod_8"));
    __export(require("mod_9"));
    __export(require("mod_14"));
    __export(require("mod_10"));
    __export(require("mod_11"));
    __export(require("mod_15"));
    __export(require("mod_16"));
}, function (require, exports) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(require("mod_2"));
    __export(require("mod_4"));
    __export(require("mod_6"));
    __export(require("mod_17"));
}, function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const index_1 = require("mod_2");
    const index_2 = require("mod_18");
    const service_1 = require("mod_13");
    const $ = require("mod_1");
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
    function map(array, parse) {
        let res = [];
        foreach(array, (x) => { res.push(parse(x)); return false; });
        return res;
    }
    function grep(array, predicate) {
        let i, res = [];
        for (i = 0; i < array.length; i++) {
            if (predicate(array[i], i))
                res.push(array[i]);
        }
        return res;
    }
    let registeredView = [];
    function View(options) {
        return (constructor, metadata) => {
            registeredView.push({
                construct: constructor,
                binding: options.binding,
                parameters: metadata && metadata["design:paramtypes"] || [],
                html: new Promise((resolve, reject) => {
                    options.html && resolve(options.html);
                    options.template && !options.html && (() => {
                        $("<div>").load(options.template, (template, status) => {
                            status == "error" && (reject() || true) ||
                                resolve(template);
                        });
                    })();
                })
            });
        };
    }
    exports.View = View;
    class SubviewHandler extends index_2.BindingHandler {
        constructor() {
            super();
            this._binder = new index_2.Binder(index_2.Htmls, (ctx) => this._observable());
            this._observable = index_1.object();
        }
        init(element, valueAccessor, viewmodel, context) {
            this._binder.bind(element, viewmodel, context);
        }
        update(element, valueAccessor, viewmodel, context) {
            var $element = $(element);
            var array = valueAccessor();
            index_1.wrap(() => {
                var htmls = map(array, (item) => {
                    var viewType = item && item.type && grep(registeredView, (view) => view.construct.prototype instanceof item.type || item.type === view.construct)[0];
                    var view = viewType && (service_1.provider && service_1.provider.createService(viewType.construct, viewType.parameters) || new viewType.construct());
                    view && view.initialize && view.initialize(viewmodel);
                    view && item.callback && item.callback(view);
                    return viewType && viewType.html.then(value => {
                        return { template: value, model: view, config: viewType.binding };
                    });
                });
                Promise.all(htmls).then((results) => {
                    this._observable(results);
                });
            }).silent();
        }
    }
    exports.SubviewHandler = SubviewHandler;
    function start(el, type, callback) {
        var element = el;
        !element.viewmodel && (new index_2.Binder(SubviewHandler, (ctx) => [element.viewmodel.view()]).bind(element, element.viewmodel = {
            view: index_1.object({
                type: type, callback: callback
            })
        }) || true) || element.viewmodel.view({ type: type, callback: callback });
    }
    exports.start = start;
}, function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const $ = require("mod_1");
    const view_1 = require("mod_19");
    class IStartUp {
        renderView(selector, view, callback) {
            view_1.start($(selector)[0], view, callback);
        }
    }
    exports.IStartUp = IStartUp;
}, function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const binder = require("mod_18");
    const index_1 = require("mod_18");
    exports.BindingHandler = index_1.BindingHandler;
    const view_1 = require("mod_19");
    class AbstractBinder extends index_1.Binder {
        constructor(handler, valueAccessor) {
            super(handler, valueAccessor);
        }
    }
    exports.AbstractBinder = AbstractBinder;
    class Attr extends AbstractBinder {
        constructor(valueAccessor) {
            super(binder.Attr, valueAccessor);
        }
    }
    exports.Attr = Attr;
    class Change extends AbstractBinder {
        constructor(valueAccessor) {
            super(binder.Change, valueAccessor);
        }
    }
    exports.Change = Change;
    class Click extends AbstractBinder {
        constructor(valueAccessor) {
            super(binder.Click, valueAccessor);
        }
    }
    exports.Click = Click;
    class ForEach extends AbstractBinder {
        constructor(valueAccessor) {
            super(binder.ForEach, valueAccessor);
        }
    }
    exports.ForEach = ForEach;
    class Htmls extends AbstractBinder {
        constructor(valueAccessor) {
            super(binder.Htmls, valueAccessor);
        }
    }
    exports.Htmls = Htmls;
    class Options extends AbstractBinder {
        constructor(valueAccessor) {
            super(binder.Options, valueAccessor);
        }
    }
    exports.Options = Options;
    class Text extends AbstractBinder {
        constructor(valueAccessor) {
            super(binder.Text, valueAccessor);
        }
    }
    exports.Text = Text;
    class Value extends AbstractBinder {
        constructor(valueAccessor) {
            super(binder.Value, valueAccessor);
        }
    }
    exports.Value = Value;
    class Subview extends AbstractBinder {
        constructor(valueAccessor) {
            super(view_1.SubviewHandler, valueAccessor);
        }
    }
    exports.Subview = Subview;
}, function (require, exports) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    const service_1 = require("mod_13");
    __export(require("mod_2"));
    __export(require("mod_5"));
    __export(require("mod_20"));
    __export(require("mod_19"));
    __export(require("mod_13"));
    __export(require("mod_21"));
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
})