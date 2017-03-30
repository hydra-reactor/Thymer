angular.module('thymer.viewRecipe', [])

.controller('viewRecipeController', function($scope, $location, Recipes) {
  $scope.title = 'Baked Ziti';
  $scope.author = 'Chris Abrami';
  $scope.time = 195;
  $scope.cuisine = 'Italian';
  $scope.servings = 4;

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

  $scope.timeDisplay = $scope.timeCalculator($scope.time);



  $scope.image = "http://assets.kraftfoods.com/recipe_images/opendeploy/54590_640x428.jpg";
  $scope.description = 'The best recipe ever.  Really, I think it is the best ever cause it is super tasty and very good.  Anyone in their right mind should go about trying to prepare it!  Just try to not love it!';
  $scope.ingredients = ["2 cups flour", "1/2 tsp baking soda", "1/2 tsp salt", "3/4 cup unsalted butter, melted", "1 cup packed brown sugar", "1/2 cup white sugar", "1 tbs vanilla extract", "1 egg", "1 egg yolk", "2 cups chocolate chips"];
  //comments do not yet exist in data.  Will likely be an array of objects.  Each object will likely have the following properties:  username, message, date
  $scope.steps = [{description: "mix together brown sugar, garlic, liquid smoke, and crushed red peppers and saute over low heat.", totalMinutes: 5,type: "cookType"}, {description: "add young jack-fruit (drained) and simmer over medium heat", totalMinutes: 15, type: "cookType"}, {description: "add the BBQ and simmer", totalMinutes: 5, type: "cookType"}, {description: "serve as you would BBQ pork", totalMinutes: 0, type: "cookType"}];



  $scope.comments = [{username: 'abramicf', message: 'This is the best dish I have ever had.  Like, ever.  Totally recommended.', date: '12/10/2016'},{username: 'umaabrami', message: 'Not so sure about this one.  Felt a bit queasy afterwards, but maybe its just me', date: '10/10/2016'}, {username: 'abramicf', message: 'This is the best dish I have ever had.  Like, ever.  Totally recommended.', date: '12/10/2016'},{username: 'umaabrami', message: 'Not so sure about this one.  Felt a bit queasy afterwards, but maybe its just me', date: '10/10/2016'},{username: 'abramicf', message: 'This is the best dish I have ever had.  Like, ever.  Totally recommended.', date: '12/10/2016'},{username: 'umaabrami', message: 'Not so sure about this one.  Felt a bit queasy afterwards, but maybe its just me', date: '10/10/2016'},{username: 'abramicf', message: 'This is the best dish I have ever had.  Like, ever.  Totally recommended.', date: '12/10/2016'},{username: 'umaabrami', message: 'Not so sure about this one.  Felt a bit queasy afterwards, but maybe its just me', date: '10/10/2016'}];
});