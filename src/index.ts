import { IStartUp } from './istartup';
import { setServiceProvider } from './view';
import { DependencyInjector } from 'node_modules/dependency-injection/src/index';
import * as $ from 'node_modules/jquery/dist/jquery';
export * from './istartup';
export * from './view';

var injector = new DependencyInjector();
var config = injector.getConfig();
var provider = injector.getProvider();
setServiceProvider(provider);

$(() => {
    setTimeout(() => { 
        var context: Window & { StartUp?: new() => IStartUp } = window;
        var startup: IStartUp = context && context.StartUp && context.StartUp.prototype instanceof IStartUp && new context.StartUp();
        
        startup && startup.onStart(config);
        startup && context.addEventListener("hashchange", () => {
            startup.onHashChange(location.hash, location.href);
        }, false);
        startup && startup.onHashChange(location.hash, location.href);
    });
});