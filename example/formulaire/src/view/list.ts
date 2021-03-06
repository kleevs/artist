import { View, Event, IObservablizer, INotifier, text, value, click, each } from 'artiste';
import * as $ from 'node_modules/jquery/dist/jquery';
import { User } from '../model/user';

export abstract class IList {
    abstract add(user: User);
    static SelectUserEvent = new Event<IList, User>("SelectUserEvent");
    static SaveUsersEvent = new Event<IList, User[]>("SaveUsersEvent");
}

@View<List>({
    template: "dist/tmpl/list.html",
    binding: {
        "[panel-title]": (view) => text(() => "List"),
        "[data-action=save]": (view) => click(() => () => view.save() || false),
        "[data-action=clear]": (view) => click(() => () => view.clear() || false),
        "table tbody": (view) => each(() => {
            return $.map(view.observable.users, (row: User) => {
                return { 
                    "this": click(() => () => view.select(row) || false),
                    "[first]": text(() => row.first),
                    "[last]": text(() => row.last),
                    "[full]": text(() => $.grep([row.first, row.last], (item) => !!item).join(" ")),
                    "[age] input": value({ get: () => (row.age || "").toString(), set: (v) => row.age = parseInt(v) || undefined })
                }; 
            });
        })
    }
})
class List extends IList {
    private readonly observable: {
        users: User[]
    };

    constructor(private _observalizer: IObservablizer, private _notifier: INotifier) {
        super();
        this.observable = _observalizer.convert({
            users: []
        });
    }

    add(user: User) {
        this.observable.users.push(this._observalizer.convert(user));
    }

    public select(user: User) : void {
		this._notifier.forEvent(IList.SelectUserEvent).notify(this, user);
    }

    public save() : void {
		this._notifier.forEvent(IList.SaveUsersEvent).notify(this, JSON.parse(JSON.stringify(this.observable.users)));
    }

    private clear(): void {
        this.observable.users = [];
    }
}