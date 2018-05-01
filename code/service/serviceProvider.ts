import { Service, serviceProvider } from '../core/service';

export abstract class IServiceProvider {
    abstract getService<T>(type: Function & { prototype: T; }): T;
    abstract getService<T>(type: Function & { prototype: T; }): T;
    abstract createService<T>(key: Function & { prototype: T }, parameters?: any[]): T;
}

@Service({
    key: IServiceProvider
})
export class ServiceProvider extends IServiceProvider {
    getService<T>(type: Function & { prototype: T; }): T {
        return serviceProvider.getService(type);
    }

    createService<T>(key: Function & { prototype: T }, parameters?: any[]): T {
        return serviceProvider.createService(key, parameters);
    }
}


