(function () {

  'use strict';

  angular
    .module('thymer', [
      'thymer.cooking',
      'thymer.home',
      'thymer.newRecipe',
      'thymer.searchRecipes',
      'ngRoute',
      'auth0.lock',
      'angular-jwt',
      'ui.router'
    ])
    .run(run)
    .config(config)
    .service('authService', authService)
    .controller('LoginController', LoginController)
    .factory('Recipes', Recipes);

  run.$inject = ['$rootScope', 'authService', 'lock'];

  function run($rootScope, authService, lock, $location) {
    console.dir($location);
    if ($location.$$path === '/cooking') {
      $location.path('/searchRecipes');
    }
    // Put the authService on $rootScope so its methods
    // can be accessed from the nav bar
    $rootScope.authService = authService;

    // Register the authentication listener that is
    // set up in auth.service.js
    authService.registerAuthenticationListener();

    // Register the synchronous hash parser
    // when using UI Router
    lock.interceptHash();
  }

  function authService(lock, authManager) {

    function login() {
      lock.show();
    }

    // Set up the logic for when a user authenticates
    // This method is called from app.run.js
    function registerAuthenticationListener() {
      lock.on('authenticated', function (authResult) {
        localStorage.setItem('id_token', authResult.idToken);
        authManager.authenticate();
      });

      lock.on('authorization_error', function (err) {
        console.log(err);
      });
    }

    return {
      login: login,
      registerAuthenticationListener: registerAuthenticationListener
    };
  }

  function config($stateProvider, lockProvider, $urlRouterProvider) {

    $stateProvider
      .state('/', {
        url: '/',
        controller: 'homeController',
        templateUrl: 'partials/home/home.html',
        controllerAs: 'vm'
      })
      .state('cooking', {
        url: '/cooking',
        controller: 'cookingController',
        templateUrl: 'partials/cooking/cooking.html',
        controllerAs: 'vm'
      })
      .state('newRecipe', {
        url: '/newRecipe',
        controller: 'newRecipeController',
        templateUrl: 'partials/newRecipe/newRecipe.html',
        controllerAs: 'vm'
      })
      .state('searchRecipes', {
        url: '/searchRecipes',
        controller: 'searchRecipesController',
        templateUrl: 'partials/searchRecipes/searchRecipes.html',
        controllerAs: 'vm'
      })
      .state('login', {
        url: '/login',
        controller: 'LoginController',
        templateUrl: 'components/login/login.html',
        controllerAs: 'vm'
      });

    lockProvider.init({
      clientID: 'H0GrORNEusyYOrbkUgsWuJWp9FYCVR7l',
      domain: 'thymer.auth0.com',
      options: {
        _idTokenVerification: false
      }
    });

    $urlRouterProvider.otherwise('/');
  }

  function LoginController(authService) {

    var vm = this;

    vm.authService = authService;
  }

  function Recipes($http) {
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

    return {
      addRecipe: addRecipe,
      getRecipes: getRecipes,
      setCurrentRecipe: setCurrentRecipe,
      getCurrentRecipe: getCurrentRecipe,
      visible: visible
    };
  }

})();