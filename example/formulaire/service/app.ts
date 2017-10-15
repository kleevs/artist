import { Service, Object, object } from '../../../src/index';
import { User } from '../model/user';

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
    private _users: Object<User[]>;
    private _archived: Object<User[]>;

    constructor() {
        super();
        this._formulaire = object<User>(new User());
        this._detail = object<User>(new User());
        this._users = object<User[]>([]);
        this._archived = object<User[]>([]);
    }

    copy(user: User): User {
        var usr = new User();
        usr.age(user.age());
        usr.last(user.last());
        usr.first(user.first());
        return usr;
    }

    add(): void {
        var users = this._users();
        var user = this._formulaire();
        users.push(this.copy(user));
        this._users(users);
    }

    clearUser(): void {
        this._formulaire(new User());
    }

    clearUsers(): void {
        this._users([]);
    }

    save(): void {
        var saved = []; 
        this._users().forEach(user => saved.push(this.copy(user)));
        this._archived(saved);
    }

    select(user: User) {
        this._detail(user);
    }

    getUsers(): User[] {
        return this._users();
    }

    getArchived(): User[] {
        return this._archived();
    }

    getSelected(): User {
        return this._detail();
    }

    getFormulaire(): User {
        return this._formulaire();
    }
}