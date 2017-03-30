angular.module('thymer', [
  'thymer.cooking',
  'thymer.home',
  'thymer.newRecipe',
  'thymer.searchRecipes',
  'ngRoute',
  'auth0.lock',
  'angular-jwt',
  'ui.router'
])

// this first step is needed to redirect on page reloads within the cooking tab
.run(function ($location) {
  run.$inject = ['$rootScope', 'authService', 'lock'];

  console.dir($location);
  if ($location.$$path === '/cooking')
  $location.path('/searchRecipes');
    // Put the authService on $rootScope so its methods
    // can be accessed from the nav bar
    $rootScope.authService = authService;

    // Register the authentication listener that is
    // set up in auth.service.js
    authService.registerAuthenticationListener();

    // Register the synchronous hash parser
    // when using UI Router
    lock.interceptHash();
})

.config(function(lockProvider, $routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'partials/home/home.html',
    controller: 'homeController'
  })
  .when('/cooking', {
    templateUrl: 'partials/cooking/cooking.html',
    controller: 'cookingController'
  })
  .when('/newRecipe', {
    templateUrl: 'partials/newRecipe/newRecipe.html',
    controller: 'newRecipeController'
  })
  .when('/searchRecipes', {
    templateUrl: 'partials/searchRecipes/searchRecipes.html',
    controller: 'searchRecipesController'
  })
  .otherwise({
    redirectTo: '/'
  });
  lockProvider.init({
      clientID: 'H0GrORNEusyYOrbkUgsWuJWp9FYCVR7l',
      domain: 'thymer.auth0.com',
      options: {
        _idTokenVerification: false
  }
})

.factory('Recipes', function($http) {
  //this is scaled to small DB, in the event of bigger DB we will need to fine-tune
  //the function to perform a filter on the backend rather then the front

  // get request to get all the recipes
  var getRecipes = function() {
    return $http ({
      method: 'GET',
      url: '/api/recipes'
    }).then(function(res) {
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

  return {
    addRecipe: addRecipe,
    getRecipes: getRecipes,
    setCurrentRecipe: setCurrentRecipe,
    getCurrentRecipe: getCurrentRecipe,
    visible: visible
  };
});