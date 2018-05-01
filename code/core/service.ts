import { DependencyInjector, IConfig, IProvider } from '../lib/dependency-injection/index';

var injector = new DependencyInjector();
export let config = injector.getConfig();
export let serviceProvider = injector.getProvider();
export let Service = injector.getDecorator();
