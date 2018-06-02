import '../lib/polyfills/promise';
import { Binder } from '../core/view';
export declare function view(valueAccessor: () => any): Binder;
export declare function view(valueAccessor: () => any, callback: (view: any) => void): Binder;
export declare function view(valueAccessor: () => any, options: {
    beforeIn?: (elts: Element) => void;
    afterIn?: (elts: Element) => void;
    beforeOut?: (elts: Element) => void;
    afterOut?: (elts: Element) => void;
    callback?: (view: any) => void;
}): Binder;
