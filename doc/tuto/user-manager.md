
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

Nous commencerons d'abord à concevoir le modèle de l'application en créant les objets représentant les utilisateurs. Créons le fichier _user.ts_ dans un nouveau répertoire _dist/model_.

_user.ts_
```typescript
export class User { 
    public id: number; 
    public firstName: string; 
    public lastName: string; 
    public birthdate: Date; 
    public login: string; 
    public password: string; 
}
```

## CRUD

Ensuite créons le service qui permettra de manipuler les objets précédemment créés. Ce service fournira les opérations de création, lecture, mise à jour et suppression. Créons un fichier _userService.ts_ dans le répertoire dist/service.

_userService.ts_
```typescript
import { User } from '../model/user'; 
 
export abstract class IUserService { 
    abstract create(user: User); 
    abstract update(user: User); 
    abstract listAll(): User[]; 
    abstract remove(user: User); 
}
```

## Première page - liste des utilisateurs

Cet écran liste tous les utilisateurs. Il permet de supprimer un utilisateur et d'acceder aux écrans d'ajout et de modification d'un utilisateur.

Créons un fichier _user.html_ dans un répertoire _dist/template_.

_user.html_
```html
<div> 
    <h1>Liste des utilisateurs</h1> 
    <table> 
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
            </tr> 
        </tbody> 
    </table> 
</div>
```
Créons un fichier _user.ts_ dans un répertoire _src/view_.

_user.ts_
```typescript
import { View, IObservablizer, each, text } from 'node_modules/artist/dist/artist'; 
import { User as UserModel } from '../model/user'; 
 
export abstract class IUser {} 
 
@View<User>({ 
    template: "dist/template/user.html", 
    binding: { 
        "tbody": (userView) => each(() => { 
            return userView.observable.list.map(user => { 
                return { 
                    "[data-id=first-name]": (row) => text(() => user.firstName), 
                    "[data-id=last-name]": (row) => text(() => user.lastName), 
                    "[data-id=birthdate]": (row) => text(() => user.birthdate), 
                    "[data-id=login]": (row) => text(() => user.login), 
                    "[data-id=password]": (row) => text(() => user.password), 
                    "[data-id=actif]": (row) => text(() => user.actif) 
                }; 
            }); 
        }) 
    } 
}) 
class User extends IUser { 
    private observable: { list: UserModel[] }; 
     
    constructor(observablizer: IObservablizer) { 
        super(); 
        this.observable = observablizer.convert({ list: [] }); 
    } 
}
```