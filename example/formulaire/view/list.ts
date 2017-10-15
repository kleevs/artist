import { object } from 'node_modules/observable/src/index';
import { View } from '../../../src/index';
import * as $ from 'node_modules/jquery/dist/jquery';
import { Text, Value, Click, ForEach } from '../../../src/index';
import { IApp } from '../service/app';

export abstract class IList {
}

@View<List>({
    template: "tmpl/list.html",
    binding: {
        "[panel-title]": [new Text(() => "List")],
        "[data-action=save]": [new Click((ctx) => () => ctx.save() || false)],
        "[data-action=clear]": [new Click((ctx) => () => ctx.clear() || false)],
        "table tbody": [new ForEach((ctx: List) => {
            return {
                array: ctx._app.getUsers(),
                config: {
                    "this": (row) => [new Click((row: any) => () => ctx.select(row) || false)],
                    "[first]": (row) => [new Text((row: any) => { return row.first(); })],
                    "[last]": (row) => [new Text((row: any) => { return row.last(); })],
                    "[full]": (row) => [new Text((row: any) => { return $.grep([row.first(), row.last()], (item) => !!item).join(" "); })],
                    "[age] input": (row) => [new Value((row: any) => { return row.age; })]
                }
            };
        })]
    }
})
class List extends IList {
    constructor(private _app: IApp) {
        super();
    }

    private select(selected) {
        this._app.select(selected);
    }

    public save() : void {
        this._app.save();
    }

    private clear(): void {
        this._app.clearUsers();
    }
}