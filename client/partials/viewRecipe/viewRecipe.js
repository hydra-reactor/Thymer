angular.module('thymer.viewRecipe', [])

.controller('viewRecipeController', function($scope, $location, $http, $routeParams, Recipes) {
  $scope.id = $routeParams.id;

  // $scope.fbShareHref = 'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Flocalhost%3A3000%2F%23%2FviewRecipe%2F' + $scope.id + '&amp;src=sdkpreparse'

  $scope.timeCalculator = function(min) {
    var minRemain = min;
    var hourCounter = 0;

    while (minRemain >= 60) {
      hourCounter++;
      minRemain = minRemain - 60;
    }

    if (hourCounter === 0) {
      return minRemain + ' min';
    } else if (hourCounter === 1) {
      if (minRemain === 0) {
        return '1 hour';
      } else {
        return '1 hour ' + minRemain + ' min';
      }
    } else {
      if (minRemain === 0) {
        return hourCounter + ' hours';
      } else {
        return hourCounter + ' hours ' + minRemain + ' min';
      }
    }
  };

  $scope.comments = [{username: 'abramicf', message: 'This is the best dish I have ever had.  Like, ever.  Totally recommended.', date: '12/10/2016'},{username: 'umaabrami', message: 'Not so sure about this one.  Felt a bit queasy afterwards, but maybe its just me', date: '10/10/2016'}, {username: 'abramicf', message: 'This is the best dish I have ever had.  Like, ever.  Totally recommended.', date: '12/10/2016'},{username: 'umaabrami', message: 'Not so sure about this one.  Felt a bit queasy afterwards, but maybe its just me', date: '10/10/2016'},{username: 'abramicf', message: 'This is the best dish I have ever had.  Like, ever.  Totally recommended.', date: '12/10/2016'},{username: 'umaabrami', message: 'Not so sure about this one.  Felt a bit queasy afterwards, but maybe its just me', date: '10/10/2016'},{username: 'abramicf', message: 'This is the best dish I have ever had.  Like, ever.  Totally recommended.', date: '12/10/2016'},{username: 'umaabrami', message: 'Not so sure about this one.  Felt a bit queasy afterwards, but maybe its just me', date: '10/10/2016'}];

  // get request to get a specific recipe by id
  $scope.getRecipeById = function(id) {
    return $http ({
      method: 'GET',
      url: '/api/recipe/' + id
    }).then(function(res) {
      console.log('getRecipeById res.data: ', res.data);
      $scope.recipe = res.data;
      $scope.timeDisplay = $scope.timeCalculator(res.data.time);
      return res.data;
    });
  };

  // updates current recipe and redirects to cooking page upon click
  $scope.updateCurrentRecipe = function(recipe) {
    Recipes.setCurrentRecipe(recipe);
    $location.path('/cooking');
  }

  $scope.getRecipeById($scope.id);
});
