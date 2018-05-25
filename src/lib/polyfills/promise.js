var CustomPromise = /** @class */ (function () {
    function CustomPromise(executor) {
        var _this = this;
        this._nextFulfilled = [];
        this._nextRejected = [];
        this._isRejected = undefined;
        executor(function (value) {
            _this._value = value;
            _this._isRejected = false;
            setTimeout(function () {
                _this._nextFulfilled.map(function (next) {
                    next.exec(value);
                });
            });
        }, function (reason) {
            var rejected = _this.getRejected();
            _this._value = reason;
            _this._isRejected = true;
            setTimeout(function () {
                rejected.map(function (next) {
                    next(reason);
                });
            });
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
