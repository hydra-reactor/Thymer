(function () {

  'use strict';

  angular
    .module('thymer')
    .run(run);

  run.$inject = ['$http', '$location', '$rootScope', 'authService', 'lock', 'authManager'];

  function run($http, $location, $rootScope, authService, lock, authManager) {

    console.log('RUN run');
    if ($location.$$path === '/cooking')
      $location.path('/searchRecipes');

      $rootScope.social = {
        title: 'Thymer: The Most Fun You\'ve Ever Had Cooking',
        description: 'Thymer is a fun and easy way to share your favorite recipes and cook recipes shared by others. Follow along with step-by-step instructions that are dictated as you cook.',
        image: 'http://i.imgur.com/VKR8Yry.jpg',
        url: 'https://hydrathymer.herokuapp.com'
      };

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

})();