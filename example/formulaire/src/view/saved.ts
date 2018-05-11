import { View, IObservablizer, text, value, click, each } from 'artist';
import * as $ from 'node_modules/jquery/dist/jquery';
import { User } from '../model/user';

export abstract class ISaved {
    abstract save(users: User[]);
}

@View<Saved>({
    template: "dist/tmpl/saved.html",
    binding: {
        "[panel-title]": (view) => text(() => "Saved"),
        "table tbody": (view) => each(() => {
            return $.map(view.observable.users, (row) => {
                return { 
                    "[first]": text(() => row.first),
                    "[last]": text(() => row.last),
                    "[full]": text(() => $.grep([row.first, row.last], (item) => !!item).join(" ")),
                    "[age]": text(() => row.age)
                }; 
            });
        })
    }
})
class Saved extends ISaved {
    private readonly observable: {
        users: User[]
    }

    constructor(observalizer: IObservablizer) {
        super();
        this.observable = observalizer.convert({
            users: []
        });
    }

    save(users: User[]) {
        this.observable.users = users;
    }
}