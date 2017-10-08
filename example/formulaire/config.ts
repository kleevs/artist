import { IStartUp, IConfig } from '../../src/index';

(<any>window).StartUp = class StartUp extends IStartUp {
    private require: (uri: string, callback: (module) => void) => void;

    constructor() {
        super();
        var context: Window & { require? } = window;
        this.require = context.require;
    }

    onStart(config: IConfig): void {
        console.log("start");
    }

    onHashChange (hash: string, href: string): void {
        console.log("hash " + hash);

        this.require("./view/layout", (module) => {
            this.renderView("[layout]", module.ILayout);
        });
    }
}

