export declare type Binder<T> = (element: Element, data: T, manager: BindManager<T>) => () => void;
export declare class BindManager<T> {
    private element;
    private data;
    constructor(element: Element, data?: T);
    manage(callback: Binder<T>): void;
}
