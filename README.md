# Tutorial MeteorJS + MongoDB

Les fichiers contenu dans le dossier `client` sont relatifs au côté **client**. On peut le voir via le fichier `client/main.jsx`, car il s'agit du point de rendu du composant `App` **Meteor**.

Les fichiers contenu dans le dossier `server` sont relatifs au côté **back-end**. on peut le voir grâce au fichier `server/main.js` qui initialise la base de données **MongoDB** avec des donées.

> [!NOTE]
> Il n'est pas nécéssaire d'installer MongoDB car Meteor.js embarque une version intégrée et prêt à l'utilisation


Notre code **React** sera localisé dans le dossier `imports/ui` et le fichier `App.jsx` est le fichier racine de l'application.

**Meteor** par défaut lors de l'utilisation de React ajoute déjà pour nous un package appelé ``hot-module-replacement``. Ce package met à jour les modules **javascript** d'une application en cours d'exécution qui ont été modifiés lors d'une reconstruction. 

Cela réduit le cycle de rétroaction pendant le développement et vous permet de voir et de tester les changements plus rapidement (*il met même à jour l'application avant que la construction ne soit terminée*). Vous ne perdrez pas non plus l'état, le code de votre application sera mis à jour et l'état **sera le même**.

> [!NOTE]
> Pour plus d'informations sur la structure de l'application, consulter la [Doc](https://guide.meteor.com/structure.html)
## MongoDB & Collections

> [!NOTE]
> On peut nommer le dossier comme l'on souhaite, il s'agit juste d'une convention.

Remarquons que nous avons écrit le code relatif à **MongoDB** à l'intérieur de `imports/api`, qui est l'endroit ou placer tout notre code relatif à l'API côté serveur.

> [!IMPORTANT]  
> Nous sommes maintenant prêt à importer du code depuis ce ``package``, lorsque vous importez du code depuis un `package` Meteor, la seule différence avec les modules NPM est que vous devez ajouter ``meteor/`` dans la partie from de votre importation.

**Comment récupérer des données depuis la base de données ?**

1. Il faut créer une publication des données vers le client dans `api/TaskPublication.js`.
2. Il faut importer ce fichier dans notre serveur `server/main.js`
3. Il faut **s'abonner** à cette publication avec le hook `useSubscribe` de **react-meteor-data** dans le fichier `imports/ui/App.jsx`. Grâce à cela, nous avons maintenant accès à une fonction `isLoading` que l'on peut utiliser pour faire le rendu avant que les données ne soit récupérées du serveur.

> Pour plus d'informations sur les **Publications/Subscriptions**, consulter la [Doc](https://v3-docs.meteor.com/api/meteor#pubsub).

Afin de visualiser les données présente dans notre base, il existe plusieurs solutions : 
- Utiliser un GUI **MongoDB**
- Utiliser le **CLI** `mongosh`. Dans notre exemple, il suffit de : 
  - Lancer la commande `meteor mongo` afin de lancer une connexion avec `mongosh` à la base de données.
  - Selectionner la base à utiliser `use <db_name>`.
  - Une fois fait, utiliser la commande `db.tasks.find()` pour récupérer la totalité de la collection.

Afin de pouvoir créer un formulaire pour ajouter des tâches dans notre base de données : 
1. Créer un composant **Formulaire** dans `ui/TaskComponent.jsx`
2. Ajouter un **Submit Handler**. Nous aurons besoin d'une méthode de **Meteor**. Les méthodes de **Meteor** sont des appels **RPC** qui nous permettentde pouvoir performer des opérations coté serveur de manières sécurisée. On peut retrouver plus d'information dans [la page de documentation concernée](https://guide.meteor.com/methods.html). Nous pouvons le créer dans le fichier `imports/api/tasksMethods.js`
3. Ne pas oublier d'intégrer les méthods crées dans le fichier serveur `main.js` et dans le fichier client `main.jsx`.

### Créer de nouvelles méthodes `Meteor`

1. Créer un fichier dans le dossier `imports/api`. Par exemple `taskMethods.js`.
2. Utilise la fonction `methods()` de `Meteor`.
3. Nommer la méthode crée et retourner une execution d'une méthode **MongoDB** provenant de la **Collection** active. Par exemple `return TaskCollection.insertAsync()`
```javascript
Meteor.methods({
  "tasks.insert"(doc) {
    return TaskCollection.insertAsync(doc);
  }});
```
4. Importer le fichier côté serveur dans `server/main.js` et côté client dans `client/main.jsx`

> [!WARNING]
> 
> Attention, dans certains cas, il faut utiliser le keyword funcction afin de définir un callback pour les méthods Meteor.
> 
> Par exemple, lorsque l'on ajoute la protection des données relative à l'utilisateur, le code suivant nous renvoie une erreur `this.ready is not a function` :
> ```js
> Meteor.publish("tasks", () => {
>    const userId = this.userId;
>    if (!userId) {
>        return this.ready();
>   }
>    return TaskCollection.find({userId});
> })
> ```
> Cela est dû à l'héritage par défaut de la valeur de `this` entre les fonction basiques et les fonctions fléchées. Le code suivant ne nous renvoit pas d'erreurs :
>
> ```js
>Meteor.publish("tasks", function () {
>  const userId = this.userId;
>  if (!userId) {
>    return this.ready();
>  }
>  return TaskCollection.find({ userId });
> });
> ```
### Debug de l'application

Meteor.js propose diverse façon de pouvoir débugguer son application.

- `console.log()` permet de pouvoir log des informations côté client & server.
- `meteor shell` permet de connecter un shell sur l'application et de pouvoir ainsi tester le code côté serveur.
- 

// Meteor.publish("tasks", () => {
    // console.log(this);
//     const userId = this.userId;
//     if (!userId) {
//         return this.ready();
//     }
//     return TaskCollection.find({userId});
// })

// We need to use the function keyword to make it work.
Meteor.publish("tasks", function () {
  const userId = this.userId;
  if (!userId) {
    return this.ready();
  }
  return TaskCollection.find({ userId });
});