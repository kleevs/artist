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
    var EventHandle = /** @class */ (function () {
        function EventHandle() {
            this._dico = {};
        }
        EventHandle.prototype.once = function (key, callback) {
            callback && callback instanceof Function && (this._dico[key] = callback);
        };
        EventHandle.prototype.trigger = function (key, value) {
            var callback = this._dico[key];
            this._dico[key] = undefined;
            if (callback) {
                callback(value);
            }
            else if (key === "reject" && value) {
                throw value;
            }
        };
        return EventHandle;
    }());
    var Promise = /** @class */ (function () {
        function Promise(callback) {
            var _this = this;
            this._resolve = [];
            this._reject = [];
            this._notify = [];
            this._eventHandle = new EventHandle();
            if (callback && callback instanceof Promise) {
                callback.then(function (success) {
                    _this.resolve(success);
                });
            }
            else if (callback && callback instanceof Function) {
                var obj = callback(function (result) { _this.resolve(result); }, function (result) { _this.reject(result); }, function (result) { _this.notify(result); });
                if (obj && obj instanceof Promise) {
                    obj.then(function (success) {
                        _this.resolve(success);
                    });
                }
            }
            else {
                this.resolve(callback);
            }
        }
        Promise.prototype.triggerSuccess = function (value) {
            var _this = this;
            if (value && value instanceof Promise) {
                value.then(function (success) {
                    _this.triggerSuccess(success);
                });
            }
            else {
                this._eventHandle.trigger("success", value);
            }
        };
        Promise.prototype.resolve = function (result) {
            var _this = this;
            setTimeout(function () {
                _this._result = result;
                if (_this._resolve && _this._resolve.length > 0) {
                    try {
                        for (var i = 0; i < _this._resolve.length; i++) {
                            _this._resolve[i] instanceof Function && _this.triggerSuccess(_this._resolve[i](result));
                        }
                    }
                    catch (e) {
                        _this._eventHandle.trigger("reject", e);
                    }
                }
                else {
                    _this._eventHandle.trigger("success", result);
                }
            });
        };
        Promise.prototype.reject = function (result) {
            var _this = this;
            setTimeout(function () {
                _this._catched = result;
                var value = result;
                if (_this._reject.length > 0) {
                    try {
                        for (var i = 0; i < _this._reject.length; i++) {
                            _this.triggerSuccess(_this._reject[i](value));
                        }
                    }
                    catch (e) {
                        _this._eventHandle.trigger("reject", e);
                    }
                }
                else {
                    _this._eventHandle.trigger("reject", value);
                }
            });
        };
        Promise.prototype.notify = function (result) {
            var _this = this;
            setTimeout(function () {
                var value = result;
                for (var i = 0; i < _this._notify.length; i++) {
                    _this._notify[i](value);
                }
            });
        };
        Promise.prototype.then = function (resolve) {
            var _this = this;
            this._resolve.push(resolve);
            this._result && this.resolve(this._result);
            return new Promise(function (success, reject) {
                _this._eventHandle.once("success", function (value) {
                    success(value);
                });
                _this._eventHandle.once("reject", function (value) {
                    reject(value);
                });
            });
        };
        Promise.prototype.catch = function (reject) {
            var _this = this;
            this._reject.push(reject);
            this._catched && this.reject(this._catched);
            return new Promise(function (success, reject) {
                _this._eventHandle.once("success", function (value) {
                    success(value);
                });
                _this._eventHandle.once("reject", function (value) {
                    reject(value);
                });
            });
        };
        Promise.prototype.progress = function (notify) {
            this._notify.push(notify);
            return this;
        };
        Promise.all = function (promises) {
            return new Promise(function (success) {
                var i = 0, length = promises ? promises.length : 0, res = [];
                for (var j = 0; j < length; j++) {
                    res.push(null);
                }
                if (!length) {
                    success(res);
                    return;
                }
                promises.forEach(function (promise, index) {
                    (promise instanceof Promise && promise || Promise.resolve(promise)).then(function (value) {
                        i++;
                        res[index] = value;
                        if (i >= length) {
                            success(res);
                        }
                    });
                });
            });
        };
        Promise.resolve = function (value) {
            return new Promise(function (resolve) { resolve(value); });
        };
        return Promise;
    }());
    exports.Promise = Promise;
});
