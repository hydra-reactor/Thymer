angular.module('thymer.cooking', [])

.controller('cookingController', function($scope, Recipes, $location, $rootScope) {
  $rootScope.social.title = 'Cooking';
  Recipes.visible();

  $scope.go = Recipes.go;

  $(document).ready(function() {
    // stops the timer and resets the index whenever user navigates to another tab
    window.onhashchange = function () {
      $scope.stopCooking();
      for (var i = 0; i = $scope.cookSteps.length; i++) {
        $('#vid' + i).get(0).pause();
      }
      $scope.stepIndex = 0;
    };
  });

  //stops both timers
  $scope.stopCooking = function() {
    totalClock.stop();
    stepClock.stop();
  };

  //starts both timers
  $scope.startCooking = function() {
    totalClock.start();
    stepClock.start();
  };

  // gets recipe from the recipe page
  $scope.recipe = Recipes.getCurrentRecipe();
  $scope.cookSteps = [];
  $scope.cookStepTimes = [];

  //sort through and organize step information
  $scope.recipe.steps.forEach(function(step) {
    $scope.cookStepTimes.push(step.totalMinutes);
    $scope.cookSteps.push(step);
  });
  //Assign index of clicked step in HTML
  $scope.stepIndex = 0;



  $scope.setStepIndex = function(selectedStep) {
    for (var i = 0; i < $scope.recipe.steps.length; i++) {
      if (selectedStep['description'] === $scope.recipe.steps[i]['description']) {
        $scope.stepIndex = i;
      }
    }
  };

  //creates two sub arrays from the array of cooking steps created in line 40.  Different tasks (formatting and voice protocal commands) performed on each item in the two different arays as necessary.

  $scope.timeRemaining = $scope.recipe.time;

  $scope.stepsExecute = function(index) {
    if (index === $scope.recipe.steps.length) {
      return;
    }

    $scope.stopCooking();
    var completeSteps = $scope.cookSteps.slice(0, index);
    var remainingSteps = $scope.cookSteps.slice(index);

    for (var i = 0; i < completeSteps.length; i++) {
      $('#step' + i).addClass('completed-list-group-item');
      $('#vid' + i).get(0).pause();
    }

    for (var j = index; j < remainingSteps.length; j++) {
      var thisStep = $('#step' + j);
      if (thisStep.hasClass('active-list-group-item')) {
        thisStep.removeClass('active-list-group-item');
      }
      if (thisStep.hasClass('completed-list-group-item')) {
        thisStep.removeClass('completed-list-group-item');
      }
    }

    var minRemain = 0;
    for (var k = 0; k < remainingSteps.length; k++) {
      minRemain += remainingSteps[k].totalMinutes;
    }
    $scope.timeRemaining = minRemain;
    totalClock = FlipClock($('.total-cook'), $scope.timeRemaining * 60, {
      clockFace: 'HourlyCounter',
      countdown: true,
      autoStart: false
    });

    stepClock.setTime(remainingSteps[0].totalMinutes * 60);
    $scope.startCooking();

    $('#vid' + index).append('<source src="http://api.voicerss.org/?key=c005359f68ec4ab89c485808abf9c53c&hl=en-gb&src=' + $scope.cookSteps[index].description + '"' + ' type="audio/mpeg">');

    $('#step' + index).addClass('active-list-group-item');

    setInterval(function() {

      $(window).on('hashchange', function() {
        $scope.stopCooking();
        clearInterval();
      });
    }, 1000);
    //currently, function DOES NOT RECURSE TO THE NEXT STEP because this 'IF' statement is outside the setInterval function.  It needs to be placed inside the setInterval function and another function needs to be created that will clearInterval when the user navigates to a different page.  Tried many ways to no avail as yet, but am certain that can be done, and likely can be done rather easily.
    if (!stepClock.face.factory.running) {
      $scope.stepsExecute(index + 1);
    }
  };

  //creates and initializes the total timer
  var totalClock = FlipClock($('.total-cook'), $scope.timeRemaining * 60, {
    clockFace: 'HourlyCounter',
    countdown: true,
    autoStart: false
  });

  // var i set here to increment through cook-steps
  var i = $scope.stepIndex;

  // sets the clock format based on step-duration
  var clockFormat = 'MinuteCounter';
  if ($scope.cookStepTimes[i] > 60) {
    clockFormat = 'HourlyCounter';
  }

  //creates the local timer (sets it initially)
  var stepClock = new FlipClock($('.step-time'), $scope.cookStepTimes[i] * 60, {
    clockFace: clockFormat,
    countdown: true,
    autoStart: false
  });
});
