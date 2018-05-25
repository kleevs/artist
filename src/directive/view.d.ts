import '../lib/polyfills/promise';
import { Binder } from '../core/view';
export declare function view(valueAccessor: () => any): Binder;
export declare function view(valueAccessor: () => any, callback: (view: any) => void): Binder;
