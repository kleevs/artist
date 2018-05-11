import { View, IObservablizer, each, text, click, attr } from 'node_modules/artist/dist/artist'; 
import { User as UserModel } from '../model/user';
 
export abstract class IList {
    abstract getById(userId: number): UserModel;
    abstract add(user: UserModel): void;
    abstract remove(user: UserModel): void;
} 
 
@View<List>({ 
    template: "dist/template/list.html", 
    binding: { 
        "tbody": (userView) => each(() => { 
            return userView.observable.list.map(user => { 
                return { 
                    "[data-id=first-name]": text(() => user.firstName), 
                    "[data-id=last-name]": text(() => user.lastName), 
                    "[data-id=birthdate]": text(() => user.birthdate && user.birthdate.toDateString()), 
                    "[data-id=login]": text(() => user.login), 
                    "[data-id=password]": text(() => user.password), 
                    "[data-id=actif]": text(() => user.actif ? 'Actif' : 'Inactif'),
                    "[data-id=action] a": attr(() => { return { href: `/#/update/${user.id}` }; }),
                    "[data-id=action] button": click(() => () => userView.remove(user))
                }; 
            }); 
        }) 
    } 
}) 
class List extends IList { 
    private observable: { list: UserModel[] }; 
     
    constructor(observablizer: IObservablizer) { 
        super(); 
        this.observable = observablizer.convert({ list: [] }); 
    } 

    remove(user: UserModel) {
        this.observable.list = this.observable.list.filter(u => u.id !== user.id);
        return true;
    }

    add(user: UserModel) {
        this.observable.list.push(user);
    }

    getById(userid: number) {
        return this.observable.list.filter(u => u.id === userid)[0];
    }
}