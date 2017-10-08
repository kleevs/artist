import { IConfig } from 'node_modules/dependency-injection/src/index';
import * as $ from 'node_modules/jquery/dist/jquery';
import { start } from './view';

export * from 'node_modules/dependency-injection/src/index';

export abstract class IStartUp {
    abstract onStart(config: IConfig): void;
    abstract onHashChange (hash: string, href: string): void;
    protected renderView(selector: string, view: Function): void {
        start($(selector)[0], view);
    }
}