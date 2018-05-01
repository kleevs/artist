import { DependencyInjector, IConfig, IProvider } from '../lib/dependency-injection/index';

var injector = new DependencyInjector();
export let config = injector.getConfig();
export let serviceProvider = injector.getProvider();
export let Service = injector.getDecorator();

export abstract class IServiceProvider {
    abstract getService<T>(type: Function & { prototype: T; }): T;
    abstract getService<T>(type: Function & { prototype: T; }): T;
    abstract createService<T>(key: Function & { prototype: T }, parameters?: any[]): T;
}

export abstract class IObservablizer {
    abstract convert<T>(value: T & {}): T;
}
