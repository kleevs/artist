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
