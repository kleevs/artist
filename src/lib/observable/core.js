(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
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
