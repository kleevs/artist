import { Object, object } from '../../../src/index';
import { User } from '../model/user';
import { Service } from '../../../src/index';

export abstract class IApp {
    abstract add(): void;
    abstract clearUser(): void;
    abstract clearUsers(): void;
    abstract save(): void;
    abstract select(user: User): void;
    abstract getSelected(): User;
    abstract getFormulaire(): User;
    abstract getUsers(): User[];
    abstract getArchived(): User[];
}

@Service({
    interface: IApp
})
class App extends IApp {
    private _formulaire: Object<User>;
    private _detail: Object<User>;
    private _users: User[] = [];
    private _archived: User[] = [];

    constructor() {
        super();
        this._formulaire = object<User>(new User());
        this._detail = object<User>(new User());
    }

    add(): void {
        var user = this._formulaire();
        var usr = new User();
        usr.age(user.age());
        usr.last(user.last());
        usr.first(user.first());
        this._users.push(usr);
    }

    clearUser(): void {
        this._formulaire(new User());
    }

    clearUsers(): void {
        this._users.length = 0;
    }

    save(): void {
        this._archived.length = 0;
        this._users.forEach(user => this._archived.push(user));
    }

    select(user: User) {
        this._detail(user);
    }

    getUsers(): User[] {
        return this._users;
    }

    getArchived(): User[] {
        return this._archived;
    }

    getSelected(): User {
        return this._detail();
    }

    getFormulaire(): User {
        return this._formulaire();
    }
}