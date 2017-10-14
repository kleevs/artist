import { object } from 'node_modules/observable/src/index';
import { View } from '../../../src/index';
import * as $ from 'node_modules/jquery/dist/jquery';
import { Text, Value, Click, ForEach } from '../../../src/index';

export abstract class IList {
    abstract add(person: { last: string, first: string, age: string }): void;
    public selected;
    public parent: any;
}

@View<List>({
    template: "tmpl/list.html",
    binding: {
        "[panel-title]": [new Text(() => "List")],
        "[data-action=save]": [new Click((ctx) => () => ctx.save() || false)],
        "[data-action=clear]": [new Click((ctx) => () => ctx.clear() || false)],
        "table tbody": [new ForEach((ctx: List) => {
            return {
                array: ctx.array(), 
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
    private array;

    constructor() {
        super();
        this.array = object<any[]>([]);
        this.selected = object<any>();
    }

    initialize(viewParent) {
        this.parent = viewParent;
        viewParent.list = this;
    }

    public add(person: { last: string, first: string, age: string }) : void {
        var array = this.array() || [];
        var obs = {};
        for (var key in person) {
            obs[key] = object(person[key]);
        }

        array.push(obs);
        this.array([].concat(array));
    }

    private select(selected) {
        this.selected(selected);
    }

    public save() : void {
        var array = this.array() || [];
        this.parent.save(JSON.parse(JSON.stringify(array)));
    }

    private clear(): void {
        this.array([]);
        this.selected(undefined);
    }
}