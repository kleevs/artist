import { IViewProvider } from 'viewProvider';
declare class NEvent<TContext = void, TArgument = void> {
    key: string;
    constructor(key: string);
}
export { NEvent as Event };
export declare abstract class IEventManager {
    abstract forEvent<T1, T2>(event: NEvent<T1, T2>): {
        listen: (context, callback: (context: T1, param: T2) => boolean) => {
            stop: (context) => void;
        };
        notify: (context: T1, param: T2) => void;
    };
}
export declare class EventManager extends IEventManager {
    private viewProvider;
    constructor(viewProvider: IViewProvider);
    forEvent<T1, T2>(event: NEvent<T1, T2>): {
        listen: (context: any, callback: (context: T1, param: T2) => boolean) => {
            stop: (context: any) => void;
        };
        notify: (context: T1, param: T2) => void;
    };
}
