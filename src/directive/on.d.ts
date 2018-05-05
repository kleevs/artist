import { Binder } from '../core/view';
export declare function on(event: string, valueAccessor: () => (e: Event) => boolean): Binder;
