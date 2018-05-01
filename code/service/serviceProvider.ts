import { IServiceProvider, Service, serviceProvider } from '../core/service';

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


