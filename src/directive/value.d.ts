import { Binder } from '../core/view';
export declare function value(valueAccessor: {
    get: () => string;
    set: (value: string) => void;
}): Binder;
