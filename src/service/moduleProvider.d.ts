import '../lib/polyfills/promise';
export declare abstract class IModuleProvider {
    abstract get(uri: string): Promise<any>;
}
export declare class ModuleProvider extends IModuleProvider {
    constructor();
    get(uri: string): Promise<{}>;
}
