import { IServiceProvider } from '../core/service';
export declare class ServiceProvider extends IServiceProvider {
    getService<T>(type: Function & {
        prototype: T;
    }): T;
    createService<T>(key: Function & {
        prototype: T;
    }, parameters?: any[]): T;
}
