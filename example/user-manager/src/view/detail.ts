import { View, IObservablizer, IRouter, INotifier, Event, each, value, click, attr } from 'node_modules/artistejs/dist/artiste'; 
import { User as UserModel } from '../model/user'; 
 
export abstract class IDetail {
    static Event = {
        Save: new Event<IDetail, UserModel>("Detail.Save")
    }

    abstract setUser(user: UserModel): void;
} 
 
@View<Detail>({ 
    template: "dist/template/detail.html", 
    binding: { 
        "[data-id=firstname]": (detailView) => value({ get: () => detailView.user.firstName, set: (v) => detailView.user.firstName = v }), 
        "[data-id=lastname]": (detailView) => value({ get: () => detailView.user.lastName, set: (v) => detailView.user.lastName = v }), 
        "[data-id=birthdate]": (detailView) => value({ get: () => detailView.toStringDate(detailView.user.birthdate), set: (v) => detailView.user.birthdate = detailView.parseDate(v) }), 
        "[data-id=login]": (detailView) => value({ get: () => detailView.user.login, set: (v) => detailView.user.login = v }), 
        "[data-id=password]": (detailView) => value({ get: () => detailView.user.password, set: (v) => detailView.user.password = v }), 
        "[data-id=actif]": (detailView) => value({ get: () => detailView.user.actif, set: (v) => detailView.user.actif = v }),
        "[data-id=save]": (detailView) => click(() => () => detailView.save())
    } 
}) 
class Detail extends IDetail { 
    private user: UserModel;
     
    constructor(
        observablizer: IObservablizer, 
        private router: IRouter,
        private notifier: INotifier
    ) { 
        super(); 
        this.user = observablizer.convert({
            id: undefined,
            firstName: '',
            lastName: '',
            birthdate: undefined,
            login: '',
            password: '',
            actif: false
        });
    } 

    setUser(user: UserModel) {
        this.user.id = user.id;
        this.user.firstName = user.firstName;
        this.user.lastName = user.lastName;
        this.user.birthdate = user.birthdate;
        this.user.login = user.login;
        this.user.password = user.password;
        this.user.actif = user.actif;
    }

    save() {
        this.notifier.forEvent(IDetail.Event.Save).notify(this, {
            id: this.user.id,
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            birthdate: this.user.birthdate,
            login: this.user.login,
            password: this.user.password,
            actif: this.user.actif
        });
        this.router.trigger("/#/");
        return true;
    }

    toStringDate(date: Date): string {
        return <any>(date && date instanceof Date && `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}` || date || '');
    }

    parseDate(str: string): Date {
        try {
            var arr = str && str.split("/");
            var date = new Date(parseInt(arr[2]), parseInt(arr[1])-1, parseInt(arr[0]));
            if (arr.length === 3 && arr[0].length <= 2 && arr[1].length <= 2 && arr[2].length == 4 && !isNaN(date.getTime())) {
                return date;
            } 
        } catch(e) {}
        return <any>str;
    }
}