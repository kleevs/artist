import { Service } from 'node_modules/artist/dist/artist'; 
import { User } from '../model/user'; 
 
export abstract class IUserService { 
    abstract create(user: User); 
    abstract update(user: User); 
    abstract listAll(): User[]; 
    abstract remove(user: User); 
}

@Service({
    key: IUserService
})
class UserService extends IUserService {
    private users: User[];
    private id: number;
    constructor() {
        super();
        this.users = [];
        this.id = 1;

        // création de quelques tests
        this.create({
            id: undefined,
            firstName: 'Ryan',
            lastName: 'Bob',
            birthdate: new Date(1989, 5, 10),
            login: 'ryan.bob',
            password: '1234',
            actif: true
        });

        this.create({
            id: undefined,
            firstName: 'Michel',
            lastName: 'Morgan',
            birthdate: new Date(1982, 9, 17),
            login: 'mich',
            password: '4321',
            actif: true
        });
    }

    create(user: User) {
        var usr = new User();
        usr.id = this.id++; 
        usr.firstName = user.firstName; 
        usr.lastName = user.lastName; 
        usr.birthdate = user.birthdate; 
        usr.login = user.login; 
        usr.password = user.password; 
        usr.actif = user.actif;
        this.users.push(usr);
    }

    update(user: User) {
        var usr = this.users.filter(u => u.id !== user.id)[0];
        if (usr) {
            usr.id = user.id; 
            usr.firstName = user.firstName; 
            usr.lastName = user.lastName; 
            usr.birthdate = user.birthdate; 
            usr.login = user.login; 
            usr.password = user.password; 
            usr.actif = user.actif;
        }
    }

    listAll(): User[] {
        return this.users;
    }

    remove(user: User) {
        this.users = this.users.filter(u => u.id !== user.id);
    } 
}