//Pour importer le module express
const express = require('express');

//créer une instance d'un serveur et le stocker dans une variable app
 const app = express();

 // permet d'écouter sur un PORT défi ni avec des variables d'environnements dans le bash, soit sur le port spécifié après ||.Si je choisis un port qui n'est pas disponible, je doir spécifier un autre qui n'est pas disponible.Donc je dois changer ma variable d'environnement
 const PORT = process.env.PORT || 4001;

 //Pour afficher des fichiers statiques qui sont le dossier "public"
 app.use(express.static('public'));

const expressions = [
    { id : 1, type : "Bonjour"},
    { id : 2, type : "Bonsoir"},
    { id : 3, type : "Bonne nuit"}
]

 app.get('/expressions', (req, res, next) => {
    res.send(expressions);
 });


 const monsters = {
    hydra: { height: 3, age: 4 },
    dragon: { height: 200,  age: 350 }
 } ;

 //GET /monsters/hydra m'affiche la valeur de la clé name indiquée dans l'url
 //la clé est le pramètre mis dans la route et la valeur celle indiquée dans l'url
 app.get('/monsters/:name/' , (req, res, next) => {
    console.log(req.params);
    console.log(req.query);
    res.send(monsters[req.params.name])
 });

 //La méthode find() permet de filtrer les listes d'objets.Ici, on trouve le premier objet dont le type est égal au paramètre type indiqué dans l'url
 app.get('/expressions/:type', (req, res, next) => {
    const expressionFound =  expressions.find(x => x.type === req.params.type);
    if (expressionFound) {
        res.send(expressionFound)
    } else {
        res.status(404).send('expression non trouvée')
    }
  });

  app.put('/expressions/:id', (req, res, next) => {
    //Pour la toute première expression dont l'id correspond au paramètre id
    var expressionFound = expressions.find( expression => expression.id === req.params.id);
    expressionFound.type = req.query.type;
    res.send(expressionFound);
  })

  app.post('/expressions', (req, res, next) => {
    var receivedExpression = { type: req.query.type };//création de la new expression
    receivedExpression.id = expressions.length + 1;//attribution de son id
    expressions.push(receivedExpression);//insertion dans la liste des expressions
    res.send(receivedExpression);//envoie de l'expression créee au client
  });

  app.delete('/expressions/:id', (req, res, next) => {
    const expressionFound = expressions.find( expression => expression.id === req.params.id);
    if (expressionFound) {
        delete expressions[req.params.id -1]
        res.status(204).send('expression deleted')
    } else {
        res.status(404).send('expression non trouvée')
    }
  })
 
 //Pour écouter mon application au port spécifié. Si l'écoute se fait, sera enclenchée la fonction de rappel spécifiée entre les accolades.
 app.listen(PORT, () => {
  console.log(`Le serveur écoute sur le port ${PORT}`);
 });