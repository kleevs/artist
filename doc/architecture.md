
# Introduction

Artiste est un framework qui fournit aux développeurs des outils et une architecture qui permet la création de la partie front end d'une application web.

Il se décompose en 3 parties :

## Les Vues

Les vues est une partie incontournable du framework. Ce sera le point de départ de toute application développée à l'aide d'Artiste. L'ensemble des vues constitue l'application.

Une vue est une partie visible de l'interface. Elle comprend toute la logique fonctionnelle correspondant à la gestion de l'interface utilisateur, la récupération des données à afficher et à la communication entre vues. Les aspects techniques de l'application se trouveront dans les services et directives.

Une vue est défini par une classe décorée par _@View_. Ce décorateur prends en arguments une liste d'options.

- **template** : Une chaine de caractères qui défini le chemin vers le fichier de template de la vue. Ce fichier devra être écrit en html et ne contenir qu'un seul élément root.
```typescript
...
template: 'template/index.html',
...
```
- **html** : Une chaine de caractère qui défini le template de la vue. A ne pas utiliser si l'option template est déjà renseigné.

```typescript
...
html: `<div>
    Ceci est une vue
</div>`
...
```

- **binding** : Liste de clé-valeur définissant pour chaque élément ciblé par la clé (qui est un sélecteur css) la liste des binders à utiliser lors de l'instanciation de la vue.

```typescript
...
binding: {
    '#welcome': (vue) => text(() => 'Bienvenue !')
}
...
```

Il y a 3 façons de créer une vue avec Artiste.

- Lors du lancement de l'application la vue root est créée. Elle est défini via l'attribut startup du script ou via la fonction startup.
```html
...
<script src='/node_modules/artistejs/dist/artiste.js' startup='/startup/startup' placeholder='[app]'></script>
...
```

- Dans une autre vue par injection de dépendance.
```typescript
...
@View({})
class Vue {
    constructor(private sousVue: SousVue) {
    }
}
...
```

- Via le service de création de vue _IViewProvider_.

```typescript
...
@View({})
class Vue {
    constructor(private viewProvider: IViewProvider) {
        var sousVue = viewProvider.newInstance(SousVue);
    }
}
...
```

### Exemple
Voici un exemple de vue qui contient une autre vue et utilise les service  IObservalizer du framework.

startup.html (le template de la vue)

```html
<div>
    <h1 id='title'></h1>
    <p>My first application with Artiste.</p>
    <div>
        <input id='name_input' name='name'>
    </div>
    <div>
        <label id='name' for='name_input'></label>
    </div>
</div>
```

startup.ts

```typescript
import { View, IObservablizer, IViewProvider, text, value } from 'node_modules/artistejs/dist/artiste';

@View<Startup>({
    template: 'startup.html', 
    binding: { 
        '#title': (startupView) => text(() => startupView.title),
        '#name': (startupView) => text(() => startupView.observable.message),
        'input[name=name]': (startupView) => value({ 
            get: () => startupView.observable.message, 
            set: (value) => startupView.observable.message = value
        })    
    }
}) 
class Startup {
    private title = 'Hello world !!';
    private observable: {
        message: string;
    }
    
    constructor(private observalizer: IObservablizer) {
        this.observable = observalizer.convert({
            message: 'Entrez votre nom'
        });
    }
}
```

## Le Data-binding

Le data-binding est le moyen de lier une partie du DOM à la logique contenue dans les vues d'Artiste. Toutes les manipulations du DOM devront se faire par l'intermediaire d'un binder.

Dans Artiste, un binder est une fonction appelée par le framework lors de l'instanciation d'une vue. Le type Binder est défini comme tel :
```typescript
declare type Binder = (element: Element, serviceProvider: IServiceProvider) => () => void;
```

Les arguments passés en paramètre au binder sont :

- **element** : L'élément du DOM à lier à la vue.
- **serviceProvider** : L'instance du fournisseur de service.

La fonction retournée par le Binder est une fonction de mise à jour. Elle est éxécutée à chaque fois que la valeur d'un observable qu'elle surveille est modifiée.

Voici un exemple de binder qui associe un contenu texte à un élément du DOM.

```typescript
function (element: Element, serviceProvider: IServiceProvider) {
    return () => {
        var text = 'Mon texte';
        $(element).text(text);
    }
}
```

Créer un binder de cette façon ne sert pas à grand chose. Il ne peut afficher qu'un seul et même message car il n'est pas lié à une instance de vue en particulier. Pour être utile les binders doivent être créés via des directives.

Une directive est une fonction qui renvoie un binder. Lors de l'instanciation d'une vue, les directives sont éxécutées pour fournir un nouveau binder à l'instance de vue créée. Ainsi le binder créé sera spécifique à l'instance de vue.

Voici un exemple de directive.

```typescript
function text(valueAccessor: () => string) { 
    return (element: Element, serviceProvider: IServiceProvider) => {
        return () => {
            var text = valueAccessor();
            $(element).text(text);
        }
    }
}
```

## Les Services

Les services viennent en complément des vues. Ils permettent au développeur de factoriser du code qui sera utilisés dans différentes vue et de séparer l'aspect technique d'une solution de son aspect fonctionnel. L'aspect technique devant se trouver dans un service car potentiellement réutilisable.

Un service est défini par une classe décorée par _@Service_. Ce décorateur prends en arguments une liste d'options.

- **key** : Une classe qui correspond à l'interface du service.
- **initialize** : Une fonction appelée une fois à la création de l'instance du service.
- 
Les service sont instanciés une seule et unique fois par injection de dépendance. Si plusieurs vues ont besoin d'un même service alors seule une instance de ce service sera créée et utilisée pour ces différentes vues.

### Exemple
Voici un exemple de service permettant de faire des appels ajax.

ajax.ts
```typescript
import { Service } from 'node_modules/artistejs/dist/artiste';

declare let ActiveXObject: any;

export abstract class IAjaxService {
    abstract ajax<T>(options): Promise<T>;
}

@Service({
    key: IAjaxService
}) 
class AjaxService extends IAjaxService {

    constructor() {
        super();
    }

    ajax<T>(options) {
        return new Promise<T>((resolve, reject) => {
            var xhr = this.getXMLHttpRequest();
            xhr.open(options.method, options.url, true);
            options.headers && options.headers.forEach(header => {
    xhr.setRequestHeader(header.key, header.value);
            });

            xhr.send(options.data);

            xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
        if ((xhr.status == 200 || xhr.status == 0)) {
            resolve(xhr.responseText);
        } else {
            reject({ status: xhr.status, text: xhr.responseText });
        }
    }
            };
        });
    }

    getXMLHttpRequest() {
        var xhr = null;
        var context:any = window;
        
        if (context.XMLHttpRequest || context.ActiveXObject) {
            if (context.ActiveXObject) {
    try {
        xhr = new ActiveXObject('Msxml2.XMLHTTP');
    } catch(e) {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
            } else {
    xhr = new XMLHttpRequest(); 
            }
        } else {
            alert('Votre navigateur ne supporte pas l'objet XMLHTTPRequest...');
            return null;
        }
        
        return xhr;
    }
}
```

Et son utilisation dans une vue.

home.ts
```typescript
import { View, IObservablizer, text } from 'node_modules/artistejs/dist/artiste';
import { IAjaxService } from 'service/ajax';

@View<Home>({
    template: 'home.html', 
    binding: { 
        '#message': (homeView) => text(() => homeView.observable.message), 
    }
}) 
class Home {
    private observable: {
        message: string;
    }
    
    constructor(private ajaxService: IAjaxService, private observalizer: IObservablizer) {
        this.observable = this.observalizer.convert({
            message: ''
        });
        this.ajaxService.ajax({
            url: '/get-hello-message'
        }).then(msg => this.observable.message = msg);
    }
}
```
