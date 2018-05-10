
# Gestion des utilisateurs

Dans ce tutoriel, il est présenté la création d'une application de gestion des utilisateurs à l'aide d'Artist.

L'application devra permettre de créer, modifier, supprimer un utilisateur et d'afficher la liste de tous les utilisateurs.

Un utilisateur est défini comme une personne possédant un nom, un prénom, une date de naissance et ayant un compte d'identification (login, mot de passe) actif ou inactif.

L'application comportera 3 écrans :

-  Un écran de création d'un utilisateur.
-  Un écran de modification d'un utilisateur.
-  Un écran d'affichage de la la liste des utilisateurs.

## Création du projet

Reprenons le projet du tutoriel [Hello world](hello-world.md).

## Modèle de l'application

Nous commencerons d'abord à concevoir le modèle de l'application en créant les objets représentant les utilisateurs. Créons le fichier _user.ts_ dans un nouveau répertoire _src/model_.

_user.ts_
```typescript
export class User { 
    public id: number; 
    public firstName: string; 
    public lastName: string; 
    public birthdate: Date; 
    public login: string; 
    public password: string; 
    public actif: boolean;
}
```

## CRUD

Ensuite créons le service qui permettra de manipuler les objets précédemment créés. Ce service fournira les opérations de création, lecture, mise à jour et suppression. Créons un fichier _userService.ts_ dans le répertoire _src/service_.

_userService.ts_
```typescript
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
```

## Première page - liste des utilisateurs

Cet écran liste tous les utilisateurs. Il permet de supprimer un utilisateur et d'acceder aux écrans d'ajout et de modification d'un utilisateur.

Créons un fichier _user.html_ dans un répertoire _dist/template_.

_user.html_
```html
<div> 
    <h1>Liste des utilisateurs</h1> 
    <table class="table table-striped"> 
        <thead> 
            <tr> 
                <td>Nom</td> 
                <td>Prénom</td> 
                <td>Date de naissance</td> 
                <td>Login</td> 
                <td>Mot de passe</td> 
                <td>Actif</td> 
            </tr> 
        </thead> 
        <tbody> 
            <tr> 
                <td data-id="last-name"></td> 
                <td data-id="first-name"></td> 
                <td data-id="birthdate"></td> 
                <td data-id="login"></td> 
                <td data-id="password"></td> 
                <td data-id="actif"></td> 
                <td data-id="action">
                    <a class="button">Modifier</a>
                    <button class="button" >Supprimer</button>
                </td>
            </tr> 
        </tbody> 
    </table> 
    <a href="/#/create">Nouvel utilisateur</a>
</div>
```
Créons un fichier _user.ts_ dans un répertoire _src/view_.

_user.ts_
```typescript
import { View, IObservablizer, each, text, click, attr } from 'node_modules/artist/dist/artist'; 
import { User as UserModel } from '../model/user'; 
import { IUserService } from '../service/userService';
 
export abstract class IUser {} 
 
@View<User>({ 
    template: "dist/template/user.html", 
    binding: { 
        "tbody": (userView) => each(() => { 
            return userView.observable.list.map(user => { 
                return { 
                    "[data-id=first-name]": text(() => user.firstName), 
                    "[data-id=last-name]": text(() => user.lastName), 
                    "[data-id=birthdate]": text(() => user.birthdate.toString()), 
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
class User extends IUser { 
    private observable: { list: UserModel[] }; 
     
    constructor(observablizer: IObservablizer, private userService: IUserService) { 
        super(); 
        this.observable = observablizer.convert({ list: [] }); 
        this.refresh();
    } 

    remove(user: UserModel) {
        this.userService.remove(user);
        this.refresh();
        return true;
    }

    refresh() {
        this.observable.list = this.userService.listAll();
    }
}
```

Modifions le fichier _startup.ts_ comme suit.

```typescript
import { View, IObservablizer, view } from 'node_modules/artist/dist/artist'; 
import { User as UserView } from 'view/user';
 
@View<Startup>({ 
    template: "dist/template/layout.html", 
    binding: { 
        "this": (starter) => view(() => starter.observable.view)
    } 
}) 
export class Startup { 
    private observable: { view: any }; 
     
    constructor(
        // services
        observablizer: IObservablizer,
        
        // sous vues
        private listView: UserView
    ) {
        this.observable = observablizer.convert({ view: listView }); 
    } 
} 
```

Compilons le projet et rendons nous à la page [http://localhost](http://localhost/).  Nous devons voir apparaitre la page suivante.

![Exemple](../img/user-management-example.png)

Installons la librairie [bootstrap](https://getbootstrap.com/) pour avoir un meilleur rendu.

```
npm install bootstrap --save
```

Et modifions le fichier _index.html_ en ajoutant la balise suivante.

```html
...
<link rel="stylesheet" type="text/css" href="/node_modules/bootstrap/dist/css/bootstrap.css">
...
```

Nous obtenons un rendu plus lisible.

![Exemple](../img/user-management-example-bootstrap.png)

Lorsque l'on clique sur le bouton **Supprimer** la ligne correspondante est supprimé comme voulue.
Cependant cliquer sur le bouton **Modifier** ou **Nouvel utilisateur** modifie l'url dans la barre d'adresse mais n'affiche pas de nouvelle page. C'est parceque nous n'avons pas encore fait la page de création et de modification.

## Page de création et de modification

Ajoutons au répertoire _dist/template_ le fichier _detail.html_.

```html
<diV class="container">
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">Nom</span>
            </div>
            <input data-id="lastname" type="text" class="form-control" placeholder="Lastname" aria-label="Lastname" aria-describedby="basic-addon1">
        </div>
    
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">Prénom</span>
            </div>
            <input data-id="firstname" type="text" class="form-control" placeholder="Firstname" aria-label="Firstname" aria-describedby="basic-addon1">
        </div>
    
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">Date de naissance</span>
            </div>
            <input data-id="birthdate" type="text" class="form-control" placeholder="Birthdate" aria-label="Birthdate" aria-describedby="basic-addon1">
        </div>
    
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">Login</span>
            </div>
            <input data-id="login" type="text" class="form-control" placeholder="Login" aria-label="Login" aria-describedby="basic-addon1">
        </div>
    
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">Mot de passe</span>
            </div>
            <input data-id="password" type="text" class="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1">
        </div>
    
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <div class="input-group-text">
                    <input data-id="actif" type="checkbox" aria-label="Checkbox for following text input">
                </div>
            </div>
            <span  class="form-control">Actif</span>
        </div>

        <button data-id="save" class="btn btn-light">Enregistrer</button>
    </div>
```

Et le fichier _detail.ts_ dans le répertoire _src/view_.

```typescript
import { View, IObservablizer, IRouter, each, value, click, attr } from 'node_modules/artist/dist/artist'; 
import { User as UserModel } from '../model/user'; 
import { IUserService } from '../service/userService';
 
export abstract class IDetail {} 
 
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
        private userService: IUserService,
        private router: IRouter
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

    save() {
        if (this.user.id) {
            this.userService.create(this.user);
        } else {
            this.userService.update(this.user);
        }

        this.router.trigger("/#/");
        return true;
    }

    toStringDate(date: Date) {
        return date && `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}` || '';
    }

    parseDate(str: string) {
        return new Date();
    }
}
```