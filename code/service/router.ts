import { Service } from '../core/service';

export abstract class IRouter {
    abstract on(callback: (href: string) => void): void;
    abstract trigger(href: string): void;
}

@Service({
    key: IRouter
})
export class Router extends IRouter {
    private _callbacks: ((href: string) => void)[] = [];

    constructor() {
        super();
        window.onpopstate = (state) => this.change(location.pathname);
    }

    on(callback: (href: string) => void) {
        callback(location.pathname);
        this._callbacks.push(callback);
    }

    trigger(href: string) {
        history.pushState({}, '', href);
        this.change(href);
    }

    change(href: string) {
        this._callbacks.forEach(callback => callback(href));
    }
}