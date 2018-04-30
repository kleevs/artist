export declare class Binder {
    private element;
    private data;
    constructor(element: any, data?: any);
    bind(callback: (element) => Function): any;
    bind(callback: (element, data: any) => Function): any;
    bind(callback: (element, data: any, binder: Binder) => Function): any;
}
