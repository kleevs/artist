import { Service, serviceProvider } from './service';
import { StartView } from './startview';
import * as $ from 'node_modules/jquery/dist/jquery';
import { Cache } from './cache';

export abstract class IConfig {
    public container: string;
    route(hash: string) {
        return new Promise((resolve, reject) => { 
            (<any>window).require(`/${hash}`).then((module) =>  {
                for (var i in module) {
                    resolve(module[i]);
                    break;
                }
            });
        });
    }
    loaded(hash: string, view): void {}
}

@Service({
    interface: IConfig
})
export class Config extends IConfig {
    constructor() {
        super();
    }
}