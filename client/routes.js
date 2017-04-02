(function () {

  angular.module('thymer')
  // .config(config); // Auth0 setup. -m

  // More Auth0 setup. -m
  // config.$inject = ['$stateProvider', 'lockProvider', '$urlRouterProvider'];

   // We need to merge Auth0 config setup with Dima's. -m
  function config($stateProvider, lockProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'partials/home/home.html',
        controller: 'HomeController',
        controllerAs: 'vm'
      })
      .state('cooking', {
        url: '/cooking',
        templateUrl: 'partials/cooking/cooking.html',
        controller: 'cookingController'
      })
      .state('newRecipe', {
        url: '/newRecipe',
        templateUrl: 'partials/newRecipe/newRecipe.html',
        controller: 'newRecipeController',
        authenticate: true
      })
      .state('searchRecipes', {
        url: '/searchRecipes',
        templateUrl: 'partials/searchRecipes/searchRecipes.html',
        controller: 'searchRecipesController'
      })
      .state('viewRecipe', {
        url: '/viewRecipe/:id',
        templateUrl: 'partials/viewRecipe/viewRecipe.html',
        controller: 'viewRecipeController'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'components/login/login.html', //
        controller: 'LoginController',
        controllerAs: 'vm'
      });

    lockProvider.init({
      clientID: 'H0GrORNEusyYOrbkUgsWuJWp9FYCVR7l',
      domain: 'thymer.auth0.com',
      options: {
        _idTokenVerification: true // this does nothing?
      }
    });

    $urlRouterProvider.otherwise('/home');
  }

// .config(['$routeProvider', function($routeProvider) {
//   console.log('Config run');
// var dimaconfig = 'Dima config'
//   $routeProvider
//   .when('/', {
//     templateUrl: 'partials/home/home.html',
//     controller: 'homeController'
//   })
//   .when('/cooking', {
//     templateUrl: 'partials/cooking/cooking.html',
//     controller: 'cookingController'
//   })
//   .when('/newRecipe', {
//     templateUrl: 'partials/newRecipe/newRecipe.html',
//     controller: 'newRecipeController'
//   })
//   .when('/searchRecipes', {
//     templateUrl: 'partials/searchRecipes/searchRecipes.html',
//     controller: 'searchRecipesController'
//   })
//   .when('/viewRecipe/:id', {
//     templateUrl: 'partials/viewRecipe/viewRecipe.html',
//     controller: 'viewRecipeController'
//   })
//   .otherwise({
//     redirectTo: '/'
//   });
// }]);

})();
