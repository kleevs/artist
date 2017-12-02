import { object } from 'node_modules/observable/src/index';
import { text, value, click } from 'node_modules/binder/src/index';
import { View, Service, IObservablizer } from '../../../src/index';
import { User } from '../model/user';

export abstract class IForm {
    addUser: (user: User) => void
}

@View<Form>({
    template: "example/formulaire/tmpl/form.html",
    binding: {
        "[panel-title]": (view) => text(() => "Formulaire"),
        "#last": (view) => value({ get: () => view.observable.last, set: (v) => view.observable.last = v }),
        "#first": (view) => value({ get: () => view.observable.first, set: (v) => view.observable.first = v }),
        "#age": (view) => value({ get: () => (view.observable.age || '').toString(), set: (v) => view.observable.age = parseInt(v) || undefined }),
        "[data-action=add]": (view) => click(() => () => view.add() || false),
        "[data-action=clear]": (view) => click(() => () => view.clear() || false)
    }
})
@Service({ interface: Form })
class Form extends IForm {
    private readonly observable: {
        last: string;
        first: string;
        age: number;
    }

    constructor(observalizer: IObservablizer) {
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
        this.addUser(usr);
    }

    private clear() {
        this.observable.last = undefined;
        this.observable.first = undefined;
        this.observable.age = undefined;        
    }
}