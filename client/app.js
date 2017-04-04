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
.run(function ($http, $location, $rootScope) {
  console.log('RUN run');

  if ($location.$$path === '/cooking')
  $location.path('/searchRecipes');
  $rootScope.social = {
    title: 'Thymer: The Most Fun You\'ve Ever Had Cooking',
    description: 'Thymer is a fun and easy way to share your favorite recipes and cook recipes shared by others. Follow along with step-by-step instructions that are dictated as you cook.',
    image: 'http://i.imgur.com/VKR8Yry.jpg',
    url: 'https://hydrathymer.herokuapp.com'
  }
})

.factory('Recipes', function($http, $location, $rootScope) {
  //this is scaled to small DB, in the event of bigger DB we will need to fine-tune
  //the function to perform a filter on the backend rather then the front

  // var factoryData;

  // get request to get all the recipes
  function getRecipes(cb) {
    return $http ({
      method: 'GET',
      url: '/api/recipes'
    }).then(function(res) {
      console.log('getRecipes3 res.data ', res.data);
      $rootScope.factoryData = res.data;
      if (cb) {
        console.log('cb runs with res.data');
        cb(res.data);
      }
      return res.data;
    });
  };

  // post request to update recipes
  var updateRecipe = function(recipe, endpoint) {
    // var url = endpoint;
    console.log('endpoint', endpoint);
    console.log('app.js0 - recipe', recipe);
    recipe = angular.toJson(recipe);

    return $http({
      method: 'POST',
      url: endpoint,
      // url: '/api/update/' + id,
      data: recipe
    });
  };

  // var updateRating = function(recipe, id, endpoint) {
  //   var url = '/api/updaterating' + id
  //   console.log('app.js0 - recipe', recipe);
  //   recipe = angular.toJson(recipe);
  //
  //   return $http({
  //     method: 'POST',
  //     url: endpoint,
  //     data: recipe
  //   });
  // };

  // post request to add recipes
  var addRecipe = function(recipe) {
    recipe = angular.toJson(recipe);
    console.log('app.js - recipe', recipe);
    return $http({
      method: 'POST',
      url: '/api/recipes',
      data: recipe
    });
  };

  // GET request to get a specific recipe by id
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
  var visible = function() {
    if (currentRecipe) {
      $('.cookingTab').css('visibility', 'visible');
    } else {
      $('.cookingTab').removeAttr('visibility').css('visibility', 'hidden');
    }
  };

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
    visible: visible,
    // factoryData: factoryData,
    updateRecipe: updateRecipe
  };
});
