export declare abstract class IServiceProvider {
    abstract getService<T>(type: Function & {
        prototype: T;
    }): T;
    abstract getService<T>(type: Function & {
        prototype: T;
    }): T;
    abstract createService<T>(key: Function & {
        prototype: T;
    }, parameters?: any[]): T;
}
export declare class ServiceProvider extends IServiceProvider {
    getService<T>(type: Function & {
        prototype: T;
    }): T;
    createService<T>(key: Function & {
        prototype: T;
    }, parameters?: any[]): T;
}
