var express = require('express');
var bodyParser = require('body-parser');
var mongo = require('mongo');
var mongoose = require('mongoose');
var Recipe = require('./models');
var app = express();

/*CONNECT TO DATABASE*/
//make sure to uncomment which connection you're using

// var connection = 'mongodb://thyme:thyme@ds133340.mlab.com:33340/orion-thyme';
var connection = 'mongodb://localhost/thyme';
mongoose.connect(connection);
mongoose.connection.once('open', function() {
  console.log('Thyme after thyme on: ' + connection);
});



/*CONNECT TO SERVER*/
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json());

// app.get('/', function(req, res) {
//   console.log('home!');
//   res.sendfile(__dirname + '/client/index.html');
// })

app.listen(port, function() {
  console.log("we're live!");
  console.log(port);
});


/*SERVER ROUTING*/

// Get a specific recipe by the id parameter in the URL
app.get('/api/recipe/:id', function(req, res, next) {
  console.log('Server GET request for recipe id: ', req.params.id);
  Recipe.findById(req.params.id, function(err, recipe) {
    if (err) {
      console.log('Error: ', err);
    } else {
      console.log('recipe: ', recipe);
      res.status(200).json(recipe);
    }
  });
});

app.post('/api/recipes', function(req, res, next) {

  console.log(req.body);

  var recipe = new Recipe({
    time: req.body.time,
    servings: req.body.servings,
    ingredients: req.body.ingredients,
    steps: req.body.steps,
    title: req.body.title,
    author: req.body.author,
    cuisine: req.body.cuisine,
    diet: req.body.diet,
    image: req.body.image,
    description: req.body.description
  });
  recipe.save(function(err) {
    if (err) {
      throw err;
    }
    res.send(200, "Saved to DB");
    //add redirect to new recipe page
    next();
  });
});

app.get('/api/recipes', function(req, res, next) {
  Recipe.find(function(err, data) {
    if (err) {
      throw err;
    }
    res.status(200).send(data);
    next();
  });
});
