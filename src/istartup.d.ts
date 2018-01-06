import { IConfig } from 'node_modules/dependency-injection/src/index';
export declare abstract class IStartUp {
    private _selector;
    private _starter;
    abstract onStart(config: IConfig): void;
    abstract onHashChange(hash: string, href: string): void;
    constructor(_selector: string);
    renderView<T>(type: Function & {
        prototype: T;
    }): Promise<T>;
}
