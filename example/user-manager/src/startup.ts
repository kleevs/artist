import { View, IObservablizer, INotifier, IRouter, view } from 'node_modules/artist/dist/artist'; 
import { IList as ListView } from 'view/list';
import { IDetail as DetailView, IDetail } from 'view/detail';
import { User } from 'model/user';

@View<Startup>({ 
    template: "dist/template/layout.html", 
    binding: { 
        "this": (starter) => view(() => starter.observable.view)
    } 
}) 
export class Startup { 
    private observable: { view: any }; 
    private id: number = 1;
     
    constructor(
        // services
        observablizer: IObservablizer,
        private notifier: INotifier,
        router: IRouter,
        
        // sous vues
		private listView: ListView,
		private detailView: DetailView
    ) {
        this.observable = observablizer.convert({ view: listView }); 
        this.notifier.forEvent(IDetail.Event.Save).listen(detailView, (data) => {
            if (data.id) {
                // modification
                this.listView.remove(data);
                this.listView.add(data);
            } else {
                // ajout
                data.id = this.id++;
                this.listView.add(data);
            }
        });

        router.on((href, pathname, hash) => {
            if (hash === "#/create") {
                detailView.setUser(new User());
                this.observable.view = detailView;
            } else if (hash.indexOf("#/update/") === 0) {
                var userid = parseInt(hash.split("/").pop());
                var user = this.listView.getById(userid);
                detailView.setUser(user);
                this.observable.view = detailView;
            } else {
                this.observable.view = listView;
            }
        });

        // création de quelques tests
        this.listView.add({
            id: this.id++,
            firstName: 'Ryan',
            lastName: 'Bob',
            birthdate: new Date(1989, 5, 10),
            login: 'ryan.bob',
            password: '1234',
            actif: true
        });

        this.listView.add({
            id: this.id++,
            firstName: 'Michel',
            lastName: 'Morgan',
            birthdate: new Date(1982, 9, 17),
            login: 'mich',
            password: '4321',
            actif: true
        });
    } 
} 