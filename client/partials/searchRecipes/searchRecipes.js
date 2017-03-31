angular.module('thymer.searchRecipes', [])

.controller('searchRecipesController', function($scope, $location, Recipes) {
  // toggles Cooking tab visibility in the nav bar
  Recipes.visible();

  // Get request made to get info
  Recipes.getRecipes()
  .then(function(data) {
    $scope.recipes = data;
    console.log(data);
  });

  // updates current recipe and redirects to cooking page upon click
  $scope.updateCurrentRecipe = function(recipe, id) {
    Recipes.setCurrentRecipe(recipe);
    $location.path('/viewRecipe/' + id);
  }
});
