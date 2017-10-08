import { object } from 'node_modules/observable/src/index';
import { View } from '../../../src/index';
import * as $ from 'node_modules/jquery/dist/jquery';
import { Text, Value, Click, ForEach } from '../../../src/index';

export abstract class ISaved {
    abstract save(person: { last: string, first: string, age: string }[]): void;
}

@View<Saved>({
    template: "tmpl/saved.html",
    binding: {
        "[panel-title]": [new Text((ctx) => "Saved")],
        "table tbody": [new ForEach((ctx) => {
            return { 
                array: ctx.array(), 
                config: {
                    "[first]": (row) => [new Text((row: any) => row.first)],
                    "[last]": (row) => [new Text((row: any) => row.last)],
                    "[full]": (row) => [new Text((row: any) => $.grep([row.first, row.last], (item) => !!item).join(" "))],
                    "[age]": (row) => [new Text((row: any) =>row.age)]
                }
            }; 
            
        })]
    }
})
class Saved extends ISaved {
    private array;

    constructor() {
        super();
        this.array = object<any[]>();
    }

    public save(person: { last: string, first: string, age: string }[]) : void {
        this.array(person);
    }
}