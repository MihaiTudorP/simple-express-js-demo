var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var ingredients = [
    {
        "id": "4097347",
        "text": "Eggs"
    },
    {
        "id": "234234",
        "text": "Milk"
    },
    {
        "id": "343534",
        "text": "Bacon"
    },
    {
        "id": "5657567",
        "text": "Frogs Legs"
    }
];

app.get('/', (req, res)=>{
    res.send('My first API!');
})

app.get('/ingredients', function(request, response){
    response.send(ingredients);
});

app.post('/ingredients', function(request, response){
    var ingredient = request.body;
    if (!ingredient || ingredient.text === ""){
        response.status(400).send({error: "Your ingredient must have text"});
    } else {
        ingredients.push(ingredient);
        response.status(200).send(ingredients);
    }
});

app.put('/ingredients/:ingredientId', function(request, response){
    var ingredientId = request.params.ingredientId;
    var newText = request.body.text;

    if(!newText || newText === ""){
        response.status(400).send({error: "You must provide ingredient text"})
    } else {
        found = false;
        for (var x = 0; x<ingredients.length;x++){
            var ing = ingredients[x];
            if (ing.id === ingredientId){
                ing.text = newText;
                found = true;
                break;
            }
        }
        if (found) response.send(ingredients);
        else idNotFoundError(response);
    }
});

function idNotFoundError(response){
    response.status(400).send({error: "Id not found"});
}

app.delete('/ingredients/:ingredientId', (request, response)=>{
    var ingredientId = request.params.ingredientId;
    found = false;
    for(var x= 0; x<ingredients.length; x++){
        if (ingredients[x].id === ingredientId){
            found = true;
            ingredients.splice(x, 1);
            break;
        }
    }
    if (found) response.send(ingredients);
    else idNotFoundError(response);
});

app.get('/funions', function(req, res){
    res.send('Yo, give me some funions foo!');
});

app.listen(3000, function(){
    console.log("First API running on port 3000!");
})