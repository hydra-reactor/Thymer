angular.module('thymer.home', [])

.controller('homeController', function($scope, Recipes, $rootScope) {
  $rootScope.social.title = 'Thymer: The Most Fun You\'ve Ever Had Cooking';
  $rootScope.social.description = 'Thymer is a fun and easy way to share your favorite recipes and cook recipes shared by others. Follow along with step-by-step instructions that are dictated as you cook.';

  Recipes.visible();

  if ($rootScope.factoryData) {
    $scope.recipes = $rootScope.factoryData;
  } else {
    Recipes.getRecipes()
    .then(function(data) {
      $scope.recipes = data;
    });
  }

  // Recipes.getRecipes()
  // .then(function(data) {
  //   console.log('home run - data =', data);
  //   $scope.recipes = data;
  // });
});
