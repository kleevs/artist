import { object } from 'node_modules/observable/src/index';
import { View } from '../../../src/index';
import { Text, Value, Click } from '../../../src/index';
import { IApp } from '../service/app';

export abstract class IForm {
}

@View<Form>({
    template: "tmpl/form.html",
    binding: {
        "[panel-title]": [new Text(() => "Formulaire")],
        "#last": [new Value((ctx) => { return ctx._app.getFormulaire().last; })],
        "#first": [new Value((ctx) => { return ctx._app.getFormulaire().first; })],
        "#age": [new Value((ctx) => { return ctx._app.getFormulaire().age; })],
        "[data-action=add]": [new Click((ctx) => () => ctx.add() || false)],
        "[data-action=clear]": [new Click((ctx) => () => ctx.clear() || false)]
    }
})
class Form extends IForm {
    constructor(private _app: IApp) {
        super();
    }

    private add() {
        this._app.add();
    }

    private clear() {
        this._app.clearUser();
    }
}