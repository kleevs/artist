import { observer, blind } from '../observable/index';

export declare type Binder<T> = (element: Element, data: T, manager: BindManager<T>) => () => void;

export class BindManager<T> {
    constructor(private element: Element, private data: T = undefined) {
    }
    
    public manage(callback: Binder<T>[]);
    public manage(callback: Binder<T>)
    public manage(callback: Binder<T> | Binder<T>[]) {
        if (callback instanceof Array) {
            callback.forEach(c => this.manage(c));
        } else {
            var fn = callback(this.element, this.data, this);
            blind(() => observer(() => fn()));
        }
    }
}