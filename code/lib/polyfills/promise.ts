class CustomPromise<T> {
    private _nextFulfilled: { exec: (value: T) => any, promise: CustomPromise<any> }[] = [];
    private _nextRejected: {exec: (reason: any) => any, promise: CustomPromise<any> }[] = [];
    private _value: T;
    private _isRejected: boolean = undefined;

    constructor(executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void) {
        executor((value) => {
            this._value = <T>value;
            this._isRejected = false;
            var resolve = (value) => setTimeout(() => {           
                this._nextFulfilled.map((next) => { 
                    next.exec(value);
                });
            });
            if (value && value instanceof CustomPromise) {
                value.then(v => resolve(v));
            } else {
                resolve(value);
            }
        }, (reason) => {
            var rejected = this.getRejected();
            this._value = reason;
            this._isRejected = true;
            var resolve = (reason) => setTimeout(() => {           
                rejected.map((next) => { 
                    next(reason);
                });
            });
            if (reason && reason instanceof CustomPromise) {
                reason.then(v => resolve(v));
            } else {
                resolve(reason);
            }
        });
    }

    private getRejected(): ((reason:any)=>any)[] {
        var res = [];
        return this._nextFulfilled.forEach(p => { 
            res = res.concat(p.promise._nextRejected.map((f) => f.exec));
            res = res.length > 0 && res || res.concat(p.promise.getRejected()); 
        }) || res;
    }

    public then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>), onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): CustomPromise<TResult1 | TResult2> {
        var exec, next = new CustomPromise<TResult1>((resolve, reject) => {
            exec = (value) => { 
                var rejected = next.getRejected();
                var res;
                if (onfulfilled) {
                    if (rejected.length > 0) {
                        try { 
                            res = onfulfilled(value); 
                        } catch(e) {
                            rejected.map(f => f(e));
                            return;
                        }
                    } else {
                        res = onfulfilled(value); 
                    }
                    
                    resolve(res);
                }
            }
        });

        if (this._isRejected === false) { 
            exec(this._value); 
        } else if (this._isRejected === undefined) {
            this._nextFulfilled.push({ exec: exec, promise: next });
        }

        return next;
    }

    public catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): CustomPromise<T | TResult> {
        var exec, next = new CustomPromise<TResult>((resolve, reject) => {
            exec = (reason) => { 
                var rejected = next.getRejected();
                var res;
                if (onrejected) {
                    if (rejected.length > 0) {
                        try { 
                            res = onrejected(reason); 
                        } catch(e) {
                            rejected.map(f => f(e));
                            return;
                        }
                    } else {
                        res = onrejected(reason); 
                    }
                    
                    resolve(res);
                }
            }
        });

        if (this._isRejected === true) { 
            exec(this._value); 
        } else if (this._isRejected === undefined) {
            this._nextRejected.push({ exec: exec, promise: next });
        }

        return next;
    }

    public static all<T2>(values: (T2 | PromiseLike<T2>)[]): CustomPromise<T2[]> {
        var promises = values;
        return new CustomPromise<T2[]>((success) => {
            var i = 0,
                length = promises ? promises.length : 0,
                res: T2[] = [];

            for (var j = 0; j < length; j++) {
                res.push(null);
            }

            if (!length) {
                success(res);
                return;
            }

            promises.forEach((promise, index) => {
                (promise instanceof CustomPromise && promise || CustomPromise.resolve(<T2>(<any>promise))).then((value) => {
                    i++;
                    res[index] = value;
                    if (i >= length) {
                        success(res);
                    }
                });
            });
        });
    }

    public static resolve<T>(value?: T): CustomPromise<T> {
        return new CustomPromise((resolve) => { resolve(value); });
    }
}

(<any>window).Promise = (<any>window).Promise || CustomPromise;