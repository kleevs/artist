import { text, value, click } from 'node_modules/binder/src/index';
import { View, Event, IObservablizer, INotifier } from '../../../dist/artist';
import { User } from '../model/user';

export abstract class IForm {
    static AddUserEvent = new Event<IForm, User>("AddUserEvent");
}

@View<Form>({
    template: "formulaire/tmpl/form.html",
    binding: {
        "[panel-title]": (view) => text(() => "Formulaire"),
        "#last": (view) => value({ get: () => view.observable.last, set: (v) => view.observable.last = v }),
        "#first": (view) => value({ get: () => view.observable.first, set: (v) => view.observable.first = v }),
        "#age": (view) => value({ get: () => (view.observable.age || '').toString(), set: (v) => view.observable.age = parseInt(v) || undefined }),
        "[data-action=add]": (view) => click(() => () => view.add() || false),
        "[data-action=clear]": (view) => click(() => () => view.clear() || false)
    }
})
class Form extends IForm {
    private readonly observable: {
        last: string;
        first: string;
        age: number;
    }

    constructor(observalizer: IObservablizer, private _notifier: INotifier) {
        super();

        this.observable = observalizer.convert({
            last: undefined,
            first: undefined,
            age: undefined
        });
    }

    private add() {
        var usr = new User();
        usr.last = this.observable.last;
        usr.first = this.observable.first;
        usr.age = this.observable.age;
        this._notifier.forEvent(IForm.AddUserEvent).notify(this, usr);
    }

    private clear() {
        this.observable.last = undefined;
        this.observable.first = undefined;
        this.observable.age = undefined;        
    }
}