import { object } from 'node_modules/observable/src/index';
import { View } from '../../../src/index';
import { Text, Value } from '../../../src/index';

export abstract class IDetail {
    public parent: any;
}

@View<Detail>({
    template: "tmpl/detail.html",
    binding: {
        "[panel-title]": [new Text(() => "Detail")],
        "#last": [new Value((ctx: Detail) => { return (ctx.parent.selected() || { last: ()=>{} }).last; })],
        "#first": [new Value((ctx: Detail) => { return (ctx.parent.selected() || { first: ()=>{} }).first; })],
        "#age": [new Value((ctx: Detail) => { return (ctx.parent.selected() || { age: ()=>{} }).age; })]
    }
})
class Detail extends IDetail {
    constructor() {
        super();
    }

    initialize(viewParent) {
        this.parent = viewParent;
    }
}