import { text, value, click } from 'node_modules/binder/src/index';
import { View, Service, IObservablizer } from '../../../dist/artist';
import { User } from '../model/user';

export abstract class IDetail {
    abstract select(user: User);
}

@View<Detail>({
    template: "formulaire/tmpl/detail.html",
    binding: {
        "[panel-title]": (view) => text(() => "Detail"),
        "#last": (view) => value({ get: () => view.observable.user.last, set: (v) => view.observable.user.last = v }),
        "#first": (view) => value({ get: () => view.observable.user.first, set: (v) => view.observable.user.first = v }),
        "#age": (view) => value({ get: () => (view.observable.user.age || '').toString(), set: (v) => view.observable.user.age = parseInt(v) || undefined })
    }
})
@Service({ interface: Detail })
class Detail extends IDetail {
    private readonly observable: {
        user: User;
    }

    constructor(observalizer: IObservablizer) {
        super();

        this.observable = observalizer.convert({ user: new User() });
    }

    select(user: User) {
        this.observable.user = user;
    }
}