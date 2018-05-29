import { Service } from '../core/service';
import { IConfigManager } from '../service/configManager';

export abstract class IRouter {
    abstract on(callback: (href: string, pathname: string, hash: string) => void): void;
    abstract trigger(href: string): void;
    abstract getUrl(localUri: string): string;
}

@Service({
    key: IRouter
})
export class Router extends IRouter {
    private _callbacks: ((href: string, pathname: string, hash: string) => void)[] = [];
	private _last: string;
    constructor(private configManager: IConfigManager) {
        super();
        window.onpopstate = (state) => this.change(location.href);
		window.onhashchange = (state) => this.change(location.href); 
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
		if (this._last !== str) {
			this._last = str;
			var parsed = this.parse(str);
			this._callbacks.forEach(callback => callback(parsed.href, parsed.pathname, parsed.hash));
		}
    }

    parse(href: string) {
        var a = document.createElement('a');
        a.href = href;
        return a;
    }

    getUrl(localUri: string): string {
        var configuration = this.configManager.getConfig();
        var url = localUri;

        if (configuration && configuration.path) { 
            configuration.path.some(path => {
                if (url.match(path.test)) {
                    url = url.replace(path.test, path.result);
                    return true;
                }
            });
        }

        return url;
    }
}