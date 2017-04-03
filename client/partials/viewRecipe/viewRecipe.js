angular.module('thymer.viewRecipe', ['thymer.rating'])

.controller('viewRecipeController', function($scope, $rootScope, $location, $http, $routeParams, Recipes) {
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

 // $scope.comments = [{username: 'abramicf', message: 'This is the best dish I have ever had.  Like, ever.  Totally recommended.', date: '12/10/2016'},{username: 'umaabrami', message: 'Not so sure about this one.  Felt a bit queasy afterwards, but maybe its just me', date: '10/10/2016'}, {username: 'abramicf', message: 'This is the best dish I have ever had.  Like, ever.  Totally recommended.', date: '12/10/2016'},{username: 'umaabrami', message: 'Not so sure about this one.  Felt a bit queasy afterwards, but maybe its just me', date: '10/10/2016'},{username: 'abramicf', message: 'This is the best dish I have ever had.  Like, ever.  Totally recommended.', date: '12/10/2016'},{username: 'umaabrami', message: 'Not so sure about this one.  Felt a bit queasy afterwards, but maybe its just me', date: '10/10/2016'},{username: 'abramicf', message: 'This is the best dish I have ever had.  Like, ever.  Totally recommended.', date: '12/10/2016'}, {username: 'umaabrami', message: 'Not so sure about this one.  Felt a bit queasy afterwards, but maybe its just me', date: '10/10/2016'}];

  if ($rootScope.factoryData) {
    $scope.recipes = $rootScope.factoryData;
  } else {
    Recipes.getRecipes()
    .then(function(data) {
      $scope.recipes = data;
      console.log('$scope.recipes', $scope.recipes);
    });
  }


  $scope.submitComment = function () {
    var obj = {};
    obj.username = $scope.username;
    obj.text = $scope.text;

    var arr = $scope.recipes.filter(el => el._id === $scope.id)
    // console.log('arr', arr);

    // update comments in the browser
    $scope.recipe.comments.push(obj);

    var endpoint = '/api/update/' + $scope.id;

    // post update to the server
    Recipes.updateRecipe(obj, endpoint);
  };


  $scope.submitRating = function (rating) {
    console.log('my rating', rating);
    var obj = {};
    obj.rating = rating;
    var endpoint = '/api/updaterating/' + $scope.id;

    // $scope.recipe.rating = rating;

    // post update to the server
    Recipes.updateRecipe(obj, endpoint);
  };

  // get request to get a specific recipe by id
  $scope.getRecipeById = function(id) {
    return $http ({
      method: 'GET',
      url: '/api/recipe/' + id
    }).then(function(res) {
      console.log('getRecipeById res.data: ', res.data);
      $scope.recipe = res.data;
      $scope.timeDisplay = $scope.timeCalculator(res.data.time);

      $rootScope.social = {
        title: $scope.recipe.title,
        description: $scope.recipe.description,
        image: $scope.recipe.image,
        url: 'https://hydrathymer.herokuapp.com/viewRecipe/' + $scope.id
      }

      return res.data;
    });
  };

  // updates current recipe and redirects to cooking page upon click
  $scope.updateCurrentRecipe = function(recipe) {
    Recipes.setCurrentRecipe(recipe);
    $location.path('/cooking');
  }

  $scope.getRecipeById($scope.id);




  $scope.starRating = function () {
    var el = document.querySelector('#el');

    // current rating, or initial rating
    var currentRating = 4;

    // max rating, i.e. number of stars you want
    var maxRating= 5;

    // callback to run after setting the rating
    // var callback = function(rating) { alert(rating); };
    var callback = function(rating) { alert(rating); };

    // rating instance
    var myRating = rating(el, currentRating, maxRating, $scope.submitRating);
    // var myRating = rating(el, currentRating, maxRating, callback);
  };

  $scope.starRating();
});
