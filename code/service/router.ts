import { Service } from '../core/service';

export abstract class IRouter {
    abstract on(callback: (href: string, pathname: string, hash: string) => void): void;
    abstract trigger(href: string): void;
}

@Service({
    key: IRouter
})
export class Router extends IRouter {
    private _callbacks: ((href: string, pathname: string, hash: string) => void)[] = [];

    constructor() {
        super();
        window.onpopstate = (state) => this.change(location.href);
    }

    on(callback: (href: string, pathname: string, hash: string) => void) {
        var parsed = this.parse(location.href);
        callback(parsed.href, parsed.pathname, parsed.hash);
        this._callbacks.push(callback);
    }

    trigger(href: string) {
        history.pushState({}, '', href);
        this.change(href);
    }

    change(str: string) {
        var parsed = this.parse(str);
        this._callbacks.forEach(callback => callback(parsed.href, parsed.pathname, parsed.hash));
    }

    parse(href: string) {
        var a = document.createElement('a');
        a.href = href;
        return a;
    }
}