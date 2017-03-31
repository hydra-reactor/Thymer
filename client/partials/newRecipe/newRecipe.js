angular.module('thymer.newRecipe', [])

.controller('newRecipeController', function($scope, Recipes, $location) {

  Recipes.visible();

  //////Add, Edit, and Delete Steps//////////
  $scope.steps = [];
  //initialize step time values to 0
  $scope.newMins = 0;
  $scope.newHrs = 0;

  $scope.addStep = function(){
    if($scope.newStepDescription) {
      var newStep = {
        mins: $scope.newMins,
        hrs: $scope.newHrs,
        totalMinutes: (60 * $scope.newHrs) + $scope.newMins,
        description: $scope.newStepDescription,
        type: 'cookType'
      };
      $scope.steps.push(newStep);
      $scope.newMins = 0;
      $scope.newHrs = 0;
      $scope.newStepDescription = '';
    }
  };

  $scope.delete = function(index) {
    $scope.steps.splice(index, 1);
  };

  $scope.edit = function(index){
    angular.extend($scope.steps[index], {editing:true});
  };

  $scope.save = function(index){
    delete $scope.steps[index].editing;
    var step = $scope.steps[index];
    step.totalMinutes = (60 * step.hrs) + step.mins;
    console.dir($scope.steps);
  };

  //////Add, Edit, and Delete Ingredients//////////

  $scope.ingredientList = [];

  $scope.addIngredient = function() {
    if ($scope.newIngredient) {
      var newIngredient = {
        description: $scope.newIngredient,
      };
      $scope.ingredientList.push(newIngredient);
      $scope.newIngredient = '';
    }
  };

  $('input').keydown(function(e) {
    if ( e.keyCode === 0 || e.keyCode === 13 || e.key === 'enter') {
      $('#addIngredientButton').click();
      $('#addStepButton').click();
    }
  });

  $scope.deleteIngredient = function(index) {
    $scope.ingredientList.splice(index, 1);
  };

  $scope.editIngredient = function(index) {
    angular.extend($scope.ingredientList[index], {editing:true});
  };

  $scope.saveIngredient = function(index) {
    delete $scope.ingredientList[index].editing;
  };

  // $scope.ingredients = [];

  // $scope.addIngredient = function() {
  //   var newIngredient = $scope.ingredientQty + ' ' + $scope.ingredientName;
  //   $scope.ingredients.push(newIngredient);
  //   $scope.ingredientQty = '';
  //   $scope.ingredientName = '';
  //   console.log($scope.ingredients);
  // };

  //initialize diet checkbox values to false
  $scope.vegan = false;
  $scope.dairyFree = false;
  $scope.glutenFree = false;
  $scope.fodMap = false;
  $scope.vegitarian = false;
  $scope.carnivoritarian = false;



  //////CLOUDINARY UPLOAD IMAGE//////////
  var imgPreview = document.getElementById('img-preview');
  var imgFormPreview = document.getElementById('img-form-preview');

  var CLOUDINARY_URL =  'https://api.cloudinary.com/v1_1/dcjoeciha/upload';
  var CLOUDINARY_UPLOAD_PRESET = "ceydn5w3";

  $('.upload-btn').on('click', function() {
      $('#upload-input').click();
      $('.progress-bar').text('0%');
      $('.progress-bar').width('0%');
  });

  $('#url-input').on('change', function() {
    $scope.image = $scope.addImageByUrl;
    imgPreview.src = $scope.addImageByUrl;
    imgFormPreview.src = $scope.addImageByUrl;
  });

  $('#back').on('click', function() {
    $('.modal').modal('hide');
  });

  $('#closeFailedSubmitModal').on('click', function() {
    $('#incompleteFieldsModal').modal('hide');
  });

  $('#upload-input').on('change', function(event) {

    var file = event.target.files[0];
    var formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    axios({
      url: CLOUDINARY_URL,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: formData
    }).then(function(res) {
      console.log(res);
      imgPreview.src = res.data.secure_url;
      imgFormPreview.src = res.data.secure_url;
      $scope.image = res.data.secure_url;
    }).catch(function(err) {
      console.error(err);
    });
  });


  //////Submit Recipe to DB//////////
  $scope.submitRecipe = function() {

    //if fany fields are not complete, do not submit
    $scope.incompleteFields = [];

    if (!$scope.servings) {
      $scope.incompleteFields.push('serving size');
    }
    if (!$scope.ingredientList) {
      $scope.incompleteFields.push('ingredients');
    }
    if (!$scope.steps) {
      $scope.incompleteFields.push('steps');
    }
    if (!$scope.title) {
      $scope.incompleteFields.push('title');
    }
    if (!$scope.author) {
      $scope.incompleteFields.push('author');
    }
    if (!$scope.image) {
      $scope.incompleteFields.push('image');
    }
    if (!$scope.description) {
      $scope.incompleteFields.push('description');
    }

    if ($scope.incompleteFields.length) {
      //show modal
      $('#incompleteFieldsModal').modal('show');
    } else {
      var ingredients = $scope.ingredientList.map(ingredientObj => ingredientObj.description);

      var cookTime = function() {
        var totalTime = 0;
        for (var i = 0; i < $scope.steps.length; i++) {
          var step = $scope.steps[i];
          if (step.type === 'cookType') {
            totalTime += step.totalMinutes;
          }
        }
        return totalTime;
      };

      var diet = [
        $scope.vegan,
        $scope.dairyFree,
        $scope.glutenFree,
        $scope.fodMap,
        $scope.vegitarian,
        $scope.carnivoritarian
      ].filter(v => v !== false );

      var recipe = {
        time: cookTime(), // done
        servings: $scope.servings,  // done
        ingredients: ingredients,  // done
        steps: $scope.steps, //done
        title: $scope.title, //done
        author: $scope.author, //done
        cuisine: $scope.cuisine, //done
        diet: diet, //done
        image: $scope.image, //done
        description: $scope.description //done
      };

      //send to server and db
      Recipes.addRecipe(recipe)
        .then(function() {
          $location.path('/searchRecipes');
        });
    }
  };

});
