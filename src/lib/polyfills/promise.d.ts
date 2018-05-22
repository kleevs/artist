export declare type PromiseParameter<T> = Promise<T> | T | ((resolve: (result?: T) => void, reject: (result?: any) => void, notify: (result?: any) => void) => any);
export declare class Promise<T> {
    private _eventHandle;
    private _resolve;
    private _reject;
    private _notify;
    private _result;
    private _catched;
    constructor(callback: PromiseParameter<T>);
    private triggerSuccess(value);
    private resolve(result?);
    private reject(result?);
    private notify(result?);
    then<T2>(resolve: (result?: T) => Promise<T2> | T2): Promise<T2>;
    catch(reject: (result?: any) => T | void): Promise<T>;
    progress(notify: (result?: any) => any): Promise<T>;
    static all<T2>(promises: Promise<T2>[]): Promise<T2[]>;
    static resolve<T>(value: T): Promise<T>;
}
