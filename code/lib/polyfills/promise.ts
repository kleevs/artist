class EventHandle {

    private _dico;

    constructor() {
        this._dico = {};
    }

    public once(key: string, callback: Function) {
        callback && callback instanceof Function && (this._dico[key] = callback);
    }

    public trigger(key: string, value: any) {
        var callback = this._dico[key];
        this._dico[key] = undefined;
        if (callback) {
            callback(value);
        } else if (key === "reject" && value) {
            throw value;
        }
    }
}

export declare type PromiseParameter<T> = Promise<T> | T | ((resolve: (result?: T) => void, reject: (result?: any) => void, notify: (result?: any) => void) => any);

export class Promise<T> {

    private _eventHandle: EventHandle;
    private _resolve: ((result?: T) => any)[];
    private _reject: ((result?: any) => any)[];
    private _notify: ((result?: any) => any)[];
    private _result: any;
    private _catched: any;

    constructor(callback: PromiseParameter<T>) {
        this._resolve = [];
        this._reject = [];
        this._notify = [];
        this._eventHandle = new EventHandle();

        if (callback && callback instanceof Promise) {
            (callback as Promise<T>).then((success) => {
                this.resolve(success);
            });
        } else if (callback && callback instanceof Function) {
            var obj = (callback as Function)((result) => { this.resolve(result); }, (result) => { this.reject(result); }, (result) => { this.notify(result); });
            if (obj && obj instanceof Promise) {
                obj.then((success) => {
                    this.resolve(success);
                });
            }
        } else {
            this.resolve(callback);
        }
    }

    private triggerSuccess(value: any) {
        if (value && value instanceof Promise) {
            value.then((success) => {
                this.triggerSuccess(success);
            });
        } else {
            this._eventHandle.trigger("success", value);
        }
    }

    private resolve(result?: any) {
        setTimeout(() => {
            this._result = result;
            if (this._resolve && this._resolve.length > 0) {
                try {
                    for (var i = 0; i < this._resolve.length; i++) {
                        this._resolve[i] instanceof Function && this.triggerSuccess(this._resolve[i](result));
                    }
                } catch (e) {
                    this._eventHandle.trigger("reject", e);
                }
            } else {
                this._eventHandle.trigger("success", result);
            }
        });
    }

    private reject(result?: any) {
        setTimeout(() => {
            this._catched = result;
            var value = result;
            if (this._reject.length > 0) {
                try {
                    for (var i = 0; i < this._reject.length; i++) {
                        this.triggerSuccess(this._reject[i](value));
                    }
                } catch (e) {
                    this._eventHandle.trigger("reject", e);
                }
            } else {
                this._eventHandle.trigger("reject", value);
            }
        });
    }

    private notify(result?: any) {
        setTimeout(() => {
            var value = result;
            for (var i = 0; i < this._notify.length; i++) {
                this._notify[i](value);
            }
        });
    }

    public then<T2>(resolve: (result?: T) => Promise<T2> | T2): Promise<T2> {
        this._resolve.push(resolve);
        this._result && this.resolve(this._result);
        return new Promise<T2>((success: (value: T2) => void, reject: (value: any) => void) => {
            this._eventHandle.once("success", (value: T2) => {
                success(value);
            });
            this._eventHandle.once("reject", (value: any) => {
                reject(value);
            });
        });
    }

    public catch(reject: (result?: any) => T | void): Promise<T> {
        this._reject.push(reject);
        this._catched && this.reject(this._catched);
        return new Promise<T>((success: (value: any) => void, reject: (value: any) => void) => {
            this._eventHandle.once("success", (value: any) => {
                success(value);
            });
            this._eventHandle.once("reject", (value: any) => {
                reject(value);
            });
        });
    }

    public progress(notify: (result?: any) => any): Promise<T> {
        this._notify.push(notify);
        return this;
    }

    public static all<T2>(promises: Promise<T2>[]): Promise<T2[]> {
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

    public static resolve<T>(value: T): Promise<T> {
        return new Promise((resolve) => { resolve(value); });
    }
}
