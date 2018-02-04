import { Service, serviceProvider } from './service';
import { StartView } from './startview';
import * as $ from 'node_modules/jquery/dist/jquery';
import { Cache } from './cache';
import { IConfig } from './config';

export abstract class IRouter {
    abstract onNext(href): Promise<any>;
    abstract onBack(href): Promise<any>;
    abstract onLoaded(href, view): void;
}

@Service({
    interface: IRouter
})
export class Router extends IRouter {
    private readonly cache = new Cache();

    constructor(private _config: IConfig) {
        super();
    }

    onLoad(href: string): Promise<any> {        
        return this.cache.promise(href, (resolve, reject) => {
            this._config.route(href).then(v => resolve(v));
        });
    }

    onNext(href: string): Promise<any> {
        history.pushState({}, '', href);
        return this.onLoad(href);
    }

    onBack(href: string): Promise<any> {
        return this.onLoad(href);
    }

    onLoaded(href, view): void {
        this._config.loaded(href, view);
    }
}