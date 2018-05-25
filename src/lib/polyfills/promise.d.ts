declare class CustomPromise<T> {
    private _nextFulfilled;
    private _nextRejected;
    private _value;
    private _isRejected;
    constructor(executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void);
    private getRejected();
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>), onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): CustomPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): CustomPromise<T | TResult>;
    static all<T2>(values: (T2 | PromiseLike<T2>)[]): CustomPromise<T2[]>;
    static resolve<T>(value?: T): CustomPromise<T>;
}
