import { object } from 'node_modules/observable/src/index';
import { View } from '../../../src/index';
import { Text, Value } from '../../../src/index';
import { IApp } from '../service/app';

export abstract class IDetail {
}

@View<Detail>({
    template: "tmpl/detail.html",
    binding: {
        "[panel-title]": [new Text(() => "Detail")],
        "#last": [new Value((ctx: Detail) => { return ctx._app.getSelected().last; })],
        "#first": [new Value((ctx: Detail) => { return ctx._app.getSelected().first; })],
        "#age": [new Value((ctx: Detail) => { return ctx._app.getSelected().age; })]
    }
})
class Detail extends IDetail {
    constructor(private _app: IApp) {
        super();
    }
}