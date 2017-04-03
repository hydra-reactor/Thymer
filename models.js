var mongoose = require('mongoose');

var recipeSchema = new mongoose.Schema({
    time: Number,
    servings: Number,
    ingredients: Array,
    steps: Array,
    title: String,
    author: String,
    cuisine: String,
    diet: Array,
    tags: Array,
    comments: [{
      date: Date,
      username: String,
      text: String
    }],
    rating: Number,
    image: String,
    description: String
});

var Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
