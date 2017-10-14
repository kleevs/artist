import { object } from 'node_modules/observable/src/index';
import { View } from '../../../src/index';
import { Text, Value, Click } from '../../../src/index';

export abstract class IForm {
    public parent: any;
}

@View<Form>({
    template: "tmpl/form.html",
    binding: {
        "[panel-title]": [new Text(() => "Forme")],
        "#last": [new Value((ctx) => { return ctx.last; })],
        "#first": [new Value((ctx) => { return ctx.first; })],
        "#age": [new Value((ctx) => { return ctx.age; })],
        "[data-action=add]": [new Click((ctx) => () => ctx.add() || false)],
        "[data-action=clear]": [new Click((ctx) => () => ctx.clear() || false)]
    }
})
class Form extends IForm {
    private last;
    private first;
    private age;

    constructor() {
        super();
        this.last = object<string>('');
        this.first = object<string>('');
        this.age = object<string>();
    }

    initialize(viewParent) {
        this.parent = viewParent;
    }

    private add() {
        this.parent.add({
            last: this.last(),
            first: this.first(),
            age: this.age()
        });
    }

    private clear() {
        this.last('');
        this.first('');
        this.age('');
    }
}