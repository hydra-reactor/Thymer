angular.module('thymer.rating', [])

.controller('RatingController', RatingController)
    .directive('starRating', starRating);

  function RatingController($scope, $rootScope, $http, $routeParams, Recipes) {
    $scope.id = $routeParams.id;
    this.rating1 = 4;
    $scope.rating1 = 5;
    console.log('$scope.rating1', $scope.rating1);
    this.rating2 = 2;
    this.isReadonly = true;
    this.rateFunction = function(rating) {
      console.log('Rating selected: ' + rating);
    };

// console.log('$rootScope.factoryData',$rootScope.factoryData);
//     if ($rootScope.factoryData) {
//       $scope.recipes = $rootScope.factoryData;
//       console.log('$scope.recipes -from root', $scope.recipes);
//     } else {
//       Recipes.getRecipes()
//       .then(function(data) {
//         $scope.recipes = data;
//         console.log('$scope.recipes', $scope.recipes);
//       });
//     }

    $scope.getRecipeById = function(id) {
      return $http ({
        method: 'GET',
        url: '/api/recipe/' + id
      }).then(function(res) {
        console.log('getRecipeById res.data: ', res.data);
        $scope.recipe = res.data;
        $scope.rating1 = res.data.rating || 5;
        return res.data;
      });
    };

    $scope.getRecipeById($scope.id);


    // Recipes.getRecipes()
    // .then(function(data) {
    //   $scope.recipes = data;
    //   console.log('$scope.recipes', $scope.recipes);
    //   // $scope.rating
    //   console.log('$scope.rating1-2', $scope.rating1);
    // });

  }

  function starRating() {
    return {
      restrict: 'EA',
      template:
        '<ul class="star-rating" ng-class="{readonly: readonly}">' +
        // '  <li ng-repeat="star in stars" class="star" ng-class="{filled: star.filled}" >' +
        '  <li ng-repeat="star in stars" class="star" ng-class="{filled: star.filled}" ng-click="toggle($index)">' +
        '    <i class="fa fa-star"></i>' + // or &#9733
        '  </li>' +
        '</ul>',
      scope: {
        ratingValue: '=ngModel',
        max: '=?', // optional (default is 5)
        onRatingSelect: '&?',
        readonly: '=?'
      },
      link: function(scope, element, attributes) {
        if (scope.max == undefined) {
          scope.max = 5;
        }
        function updateStars() {
          scope.stars = [];
          for (var i = 0; i < scope.max; i++) {
            scope.stars.push({
              filled: i < scope.ratingValue
            });
          }
        };
        scope.toggle = function(index) {
          if (scope.readonly == undefined || scope.readonly === false){
            scope.ratingValue = index + 1;
            scope.onRatingSelect({
              rating: index + 1
            });
          }
        };
        scope.$watch('ratingValue', function(oldValue, newValue) {
          if (newValue) {
            updateStars();
          }
        });
      }
    };
  }
