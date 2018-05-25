export class Promise<T> {
    private _nextFulfilled: { exec: (value: T) => any, promise: Promise<any> }[] = [];
    private _nextRejected: {exec: (reason: any) => any, promise: Promise<any> }[] = [];
    private _value: T;
    private _isRejected: boolean = undefined;

    constructor(executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void) {
        executor((value) => {
            this._value = <T>value;
            this._isRejected = false;
            setTimeout(() => {           
                this._nextFulfilled.map((next) => { 
                    next.exec(<T>value);
                });
            });
        }, (reason) => {
            var rejected = this.getRejected();
            this._value = reason;
            this._isRejected = true;
            setTimeout(() => {           
                rejected.map((next) => { 
                    next(reason);
                });
            });
        });
    }

    private getRejected(): ((reason:any)=>any)[] {
        var res = [];
        return this._nextFulfilled.forEach(p => { 
            res = res.concat(p.promise._nextRejected.map((f) => f.exec));
            res = res.length > 0 && res || res.concat(p.promise.getRejected()); 
        }) || res;
    }

    public then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>), onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2> {
        var exec, next = new Promise<TResult1>((resolve, reject) => {
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

    public catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult> {
        var exec, next = new Promise<TResult>((resolve, reject) => {
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

    public static all<T2>(values: (T2 | PromiseLike<T2>)[]): Promise<T2[]> {
        var promises = values;
        return new Promise<T2[]>((success) => {
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
                (promise instanceof Promise && promise || Promise.resolve(<T2>(<any>promise))).then((value) => {
                    i++;
                    res[index] = value;
                    if (i >= length) {
                        success(res);
                    }
                });
            });
        });
    }

    public static resolve<T>(value?: T): Promise<T> {
        return new Promise((resolve) => { resolve(value); });
    }
}