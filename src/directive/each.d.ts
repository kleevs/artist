import { Binder } from '../core/view';
export declare function each(valueAccessor: () => {
    [s: string]: (element) => Function;
}[]): Binder;
