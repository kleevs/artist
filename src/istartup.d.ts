import { IConfig } from 'node_modules/dependency-injection/src/index';
export declare abstract class IStartUp {
    abstract onStart(config: IConfig): void;
    abstract onHashChange(hash: string, href: string): void;
    protected renderView<T>(selector: string, view: Function & {
        prototype: T;
    }, callback?: (view: T) => void): void;
}
