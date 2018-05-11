import { View, IObservablizer, text, value, click } from 'artiste';
import { User } from '../model/user';

export abstract class IDetail {
    abstract select(user: User);
}

@View<Detail>({
    template: "dist/tmpl/detail.html",
    binding: {
        "[panel-title]": (view) => text(() => "Detail"),
        "#last": (view) => value({ get: () => view.observable.user.last, set: (v) => view.observable.user.last = v }),
        "#first": (view) => value({ get: () => view.observable.user.first, set: (v) => view.observable.user.first = v }),
        "#age": (view) => value({ get: () => (view.observable.user.age || '').toString(), set: (v) => view.observable.user.age = parseInt(v) || undefined })
    }
})
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