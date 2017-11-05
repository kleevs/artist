import { IStartUp } from './istartup';
import { config } from './service';

export * from 'node_modules/observable/src/index';
export * from 'node_modules/dependency-injection/src/index';
export * from './istartup';
export * from './view';
export * from './service';
export * from './binder';
export function startup(starter: any) {
    var context: Window = window;
    var startup: IStartUp = new starter();
    
    startup && startup.onStart && startup.onStart(config);
    startup && startup.onHashChange && context.addEventListener("hashchange", () => {
        startup.onHashChange(location.hash, location.href);
    }, false);
    startup && startup.onHashChange && startup.onHashChange(location.hash, location.href);
}

