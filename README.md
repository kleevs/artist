# Artiste

**Artiste** est un framework qui fournit aux développeurs des outils et une architecture qui permet la création de la partie front end d'une application web. Pour se familiariser avec le framework lisez [cette présentation du framework](doc/architecture.md) et les tutoriels disponibles.

# Get started

Pour commencer à utiliser le framework **Artiste** vous pouvez le télécharger sur le site officiel ou l'installer via npm.

Création du projet avec npm.

```
npm init -y
```
Installation de typescript et initialisation du projet.

```
npm install typescript --save-dev
./node_modules/.bin/tsc --init
```

Remplacer le contenu du fichier **tsconfig.json** qui vient d'être créé par le code suivant.

```javascript
{ 
    "compilerOptions": { 
        "module": "amd", 
        "moduleResolution": "classic", 
        "experimentalDecorators": true, 
        "emitDecoratorMetadata": true, 
        "lib": [ 
            "es2016", 
            "dom" 
        ] 
    }, 
    "exclude" : [ 
        "./node_modules" 
    ] 
}
```
Installation du framework **Artiste**.

```
npm install artistejs --save
```

Créer un premier fichier index.html à la racine du projet.

```html
<!DOCTYPE html> 
<html> 
    <head> 
        <script src='node_modules/jquery/dist/jquery.js'></script>
        <script 
            src='node_modules/artistejs/dist/artiste.js' 
            config='config' 
            startup='startup' 
            placeholder='app'></script> 
    </head> 
     
    <body> 
        <app></app> 
    </body> 
</html>
```

Puis, dans le même répertoire, créer un fichier config.ts.

```typescript
export default { 
    path: [ 
        { test: /^\/?(node_modules\/*)/, result: '$1' }, 
    ] 
}
```

Et startup.ts.

```typescript
import { View, text } from 'node_modules/artistejs/dist/artiste'; 
 
@View<Startup>({ 
    html: `<div> 
        <h1 id='title'></h1> 
        <p>My first application with Artiste.</p> 
    </div>`, 
    binding: { 
        '#title': (startupView) => text(() => startupView.message) 
    } 
}) 
export class Startup { 
    message = 'Hello world !!'; 
}
```

Enfin compiler le projet à l'aide de la commande tsc.

```
./node_modules/.bin/tsc
```

Ouvrer le fichier index.html avec votre navigateur web préféré.

# Tutoriel

* [Hello world](doc/tuto/hello-world.md)
* [Gestion des utilisateurs](doc/tuto/user-manager.md)