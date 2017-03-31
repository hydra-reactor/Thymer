angular.module('thymer', [
  'thymer.cooking',
  'thymer.home',
  'thymer.newRecipe',
  'thymer.searchRecipes',
  'thymer.viewRecipe',
  'ngRoute',
  'angularUtils.directives.dirPagination'
])

// this first step is needed to redirect on page reloads within the cooking tab
.run(function ($location) {
  console.dir($location);
  if ($location.$$path === '/cooking')
  $location.path('/searchRecipes');
})

.factory('Recipes', function($http, $location) {
  //this is scaled to small DB, in the event of bigger DB we will need to fine-tune
  //the function to perform a filter on the backend rather then the front

  // get request to get all the recipes
  var getRecipes = function() {
    return $http ({
      method: 'GET',
      url: '/api/recipes'
    }).then(function(res) {
      console.log('Recipes: ', res.data);
      return res.data;
    });
  };

  // post request to add recipes
  var addRecipe = function(recipe) {
    recipe = angular.toJson(recipe);
    return $http ({
      method: 'POST',
      url: '/api/recipes',
      data: recipe
    });
  };

  // get request to get a specific recipe by id
  var getRecipeById = function(id) {
    return $http ({
      method: 'GET',
      url: '/api/recipe/' + id
    }).then(function(res) {
      console.log('getRecipeById res.data: ', res.data);
      return res.data;
    });
  };

  // sets the visibility for the cooking tab in navigation
  var visible = function(){
    if(currentRecipe) {
      $('.cookingTab').css('visibility', 'visible');
    } else {
      $('.cookingTab').removeAttr('visibility').css('visibility', 'hidden');
    }
  }

  var currentRecipe;

  // returns the current recipe once it has been set
  // this step is for cooking.js
  var getCurrentRecipe = function() {
    return currentRecipe;
  };

  // sets the current recipe once it has been clicked
  // this step is for searchRecipe.js
  var setCurrentRecipe = function(recipe) {
    currentRecipe = recipe;
  };

  var go = function(path) {
    $location.path(path);
  }

  return {
    addRecipe: addRecipe,
    getRecipes: getRecipes,
    setCurrentRecipe: setCurrentRecipe,
    getCurrentRecipe: getCurrentRecipe,
    getRecipeById: getRecipeById,
    go: go,
    visible: visible
  };
});
