import { Binder } from '../core/view';
export declare function value(options: {
    get: () => boolean;
    set: (value: boolean) => void;
    on?: string;
}): Binder[];
export declare function value(options: {
    get: () => string;
    set: (value: string) => void;
    on?: string;
}): Binder[];
