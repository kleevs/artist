import { object } from 'node_modules/observable/src/index';
import { View } from '../../../src/index';
import * as $ from 'node_modules/jquery/dist/jquery';
import { Text, Value, Click, ForEach } from '../../../src/index';
import { IApp } from '../service/app';

export abstract class ISaved {
}

@View<Saved>({
    template: "tmpl/saved.html",
    binding: {
        "[panel-title]": [new Text((ctx) => "Saved")],
        "table tbody": [new ForEach((ctx: Saved) => {
            return { 
                array: ctx._app.getArchived(), 
                config: {
                    "[first]": [new Text((row: any) => row.first())],
                    "[last]": [new Text((row: any) => row.last())],
                    "[full]": [new Text((row: any) => $.grep([row.first(), row.last()], (item) => !!item).join(" "))],
                    "[age]": [new Text((row: any) =>row.age())]
                }
            }; 
            
        })]
    }
})
class Saved extends ISaved {
    constructor(private _app: IApp) {
        super();
    }
}