angular.module('thymer.searchRecipes', [])

.controller('searchRecipesController', function($scope, $location, Recipes, $rootScope) {
  $rootScope.social.title = 'All Recipes';
  $rootScope.social.description = 'Search for new recipes by name, description, or tags.';

  // toggles Cooking tab visibility in the nav bar
  Recipes.visible();

  Recipes.getRecipes()
  .then(function(data) {
    $scope.recipes = data;
  });

  // updates current recipe and redirects to cooking page upon click
  $scope.updateCurrentRecipe = function(recipe, id) {
    Recipes.setCurrentRecipe(recipe);
    $location.path('/viewRecipe/' + id);
  }
});
