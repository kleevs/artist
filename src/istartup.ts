import { IConfig } from 'node_modules/dependency-injection/src/index';
import * as $ from 'node_modules/jquery/dist/jquery';
import { start } from './view';

export abstract class IStartUp {
    abstract onStart(config: IConfig): void;
    abstract onHashChange (hash: string, href: string): void;
    protected renderView<T>(selector: string, view: Function & { prototype: T }, callback?: (view: T) => void): void {
        start($(selector)[0], view, callback);
    }
}