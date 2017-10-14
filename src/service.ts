import { foreach, map, grep } from 'node_modules/mixin/src/index';
import { DependencyInjector, IProvider, IConfig } from 'node_modules/dependency-injection/src/index';

var injector = new DependencyInjector();
export let config = injector.getConfig();
export let provider = injector.getProvider();
export let Service = injector.getDecorator();
