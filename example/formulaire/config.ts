import { IStartUp, IConfig, startup } from '../../dist/artist';
import { ILayout } from './layout/layout';

startup(class StartUp extends IStartUp {
    private _layout: ILayout;

    constructor() {
        super("[layout]");
    }

    onStart(config: IConfig): void {
        console.log("start");
        this.renderView(ILayout, (layout: ILayout) => {
            this._layout = layout;
        });
    }

    onHashChange (hash: string, href: string): void {
        console.log("hash " + hash);
    }
});

