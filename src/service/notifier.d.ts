export declare abstract class INotifier {
    abstract forEvent<TContext, TArgument>(event: Event<TContext, TArgument>): {
        listen: (context: TContext, callback: (data: TArgument) => void) => void;
        notify: (context: TContext, data?: TArgument) => void;
    };
}
export declare class Event<TContext = void, TArgument = void> {
    key: string;
    constructor(key: string);
}
export declare class Notifier extends INotifier {
    private _callbacks;
    private notify(obj, key, data);
    private listen(obj, key, callback);
    forEvent<TContext, TArgument>(event: Event<TContext, TArgument>): {
        listen: (context: TContext, callback: (data: TArgument) => void) => void;
        notify: (context: TContext, data?: TArgument) => void;
    };
    private register(obj, key);
}
