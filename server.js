var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongo = require('mongo');
var mongoose = require('mongoose');
var Recipe = require('./models');
var app = express();

/*CONNECT TO DATABASE*/
//make sure to uncomment which connection you're using

var connection = 'mongodb://thyme:thyme@ds133340.mlab.com:33340/orion-thyme';
// var connection = 'mongodb://localhost/thyme';
mongoose.connect(connection);
mongoose.connection.once('open', function() {
  console.log('Thyme after thyme on: ' + connection);
});

/*SET UP ROUTER FOR SOCIAL BOTS*/
var nonSPArouter = express.Router();

app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json());

// Middleware to check if the user-agent is a social sharing bot
app.use(function(req, res, next) {
  var ua = req.headers['user-agent'];
  if (/^(facebookexternalhit)|(Twitterbot)|(Pinterest)/gi.test(ua)) {
    console.log(ua,' is a bot');
    nonSPArouter(req, res, next);
  } else {
    next();
  }
});

/*CONNECT TO SERVER*/
var port = process.env.PORT || 8000;

app.listen(port, function() {
  console.log("we're live!");
  console.log(port);
});

/*NONSPA ROUTING*/
nonSPArouter.get('/viewRecipe/:id', function(req, res, next) {
  console.log('nonSPArouter GET request');
  var metaTags = {
    metaTagsUrl: 'http://hydrathymer.herokuapp.com/',
    metaTagsImg: 'http://i.imgur.com/VKR8Yry.jpg',
    metaTagsTitle: 'Test',
    metaTagsType: 'website',
    metaTagsDescription: "Description",
    metaTagsRobots: 'index, follow',
    metaTagsKeyWords: 'Cooking, recipes, food'
  };

  Recipe.findById(req.params.id, function(err, recipe) {
    if (err) {
      console.log('Error: ', err);
    } else {
      metaTags.metaTagsUrl = metaTags.metaTagsUrl + 'viewRecipe/' + req.params.id; // direct link to viewrecipe page
			metaTags.metaTagsImg = recipe.image != "" ? recipe.image:metaTags.metaTagsImg; // article image
			metaTags.metaTagsTitle = recipe.title; // title
      metaTags.metaTagsDescription = recipe.description; // description
			metaTags.metaTagsType = 'article'; // type of meta tags
			metaTags.metaTagsKeyWords = metaTags.metaTagsKeyWords + ',' + recipe.title; // add keywords

			res.render(path.join(__dirname, './view/index.ejs'), metaTags); // render index.ejs with meta tags
    }
  });

});


/*SERVER ROUTING*/
app.get('/api/recipes', function(req, res, next) {
  Recipe.find(function(err, data) {
    if (err) {
      throw err;
    } else {
      res.status(200).send(data);
      next();
    }
  });
});

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
  console.log('POST request for a recipe: ', req.body);

  var recipe = new Recipe({
    time: req.body.time,
    servings: req.body.servings,
    ingredients: req.body.ingredients,
    steps: req.body.steps,
    title: req.body.title,
    author: req.body.author,
    cuisine: req.body.cuisine,
    tags: req.body.tags,
    comments: req.body.comments,
    rating: req.body.rating,
    diet: req.body.diet,
    image: req.body.image,
    description: req.body.description
  });
  recipe.save(function(err) {
    if (err) {
      throw err;
    } else {
      res.send(200, "Saved to DB");
      //add redirect to new recipe page
      next();
    }
  });
});


app.post('/api/update/:id', function(req, res, next) {
  console.log('Server POST request to update: ', req.params.id);
  console.log('req', req.body);

  Recipe.findById(req.params.id, function(err, recipe) {
    if (err) {
      return console.log('Error: ', err);
    }
    recipe.comments.push(req.body);
    console.log('recipe: ', recipe);
    recipe.save(function(err) {
      if (err) {
        throw err;
      }
      res.send(200, "Saved to DB");
    });
  });
});

app.post('/api/updaterating/:id', function(req, res, next) {
  console.log('Server POST request to update: ', req.params.id);
  console.log('req', req.body);

  Recipe.findById(req.params.id, function(err, recipe) {
    if (err) {
      return console.log('Error: ', err);
    }
      recipe.rating = req.body.rating;
      console.log('recipe: ', recipe);
      recipe.save(function(err) {
        if (err) {
          throw err;
        }
        res.send(200, "Saved to DB");
      });
  });
});

// This route deals with HTML5Mode by forwarding missing files to index.html
app.all('/*', function(req, res) {
  res.sendFile(__dirname + '/client/index.html');
});
