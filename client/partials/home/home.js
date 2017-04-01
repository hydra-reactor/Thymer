angular.module('thymer.home', [])

.controller('homeController', function($scope, Recipes, $rootScope) {

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
