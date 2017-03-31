angular.module('thymer.cooking', [])

.controller('cookingController', function($scope, Recipes, $location, $rootScope) {
  $rootScope.social.title = 'Cooking';

  // toggles Cooking tab visibility in the nav bar
  Recipes.visible();

  $scope.go = Recipes.go;

  // allows user to start and stop the timer by clicking on the clock
  // and by pressing the 'space' bar. Also styles slider based on these events
   $scope.toggleOnAndOff = function() {
    if($('#checkbox').is(':checked')) {
      $scope.toggleCooking();
      $('#checkbox').attr('checked', false);
    } else {
      $scope.toggleCooking();
      $('#checkbox').attr('checked', true);
    }
  }

  // toggle the start and stop function with 'space' key
  $(document).ready(function() {
    $(document).keydown(function(e) {
      if (e.keyCode === 0 || e.keyCode === 32 || e.key === 'space') {
        $scope.toggleOnAndOff();
      }
    });
    // stops the timer whenever user navigates to another tab
    window.onhashchange = function () {
        $scope.stopCooking();
    };
  });

  // stops the cooking cycle when changing tabs
  // this is NECESSARY when leaving the cooking tab if the cooking process
  // has not been stopped
  $scope.stopCooking = function() {
    totalClock.stop();
    stepClock.stop();
    cookingStarted = false;
  }

  // gets the clicked on recipe from searchRecipes
  $scope.recipe = Recipes.getCurrentRecipe();

  $scope.cookSteps = [];
  $scope.cookStepTimes = [];

  //sort through and organize step information
  $scope.recipe.steps.forEach(function(step) {
    $scope.cookStepTimes.push(step.totalMinutes);
    $scope.cookSteps.push(step);
  });

  //CREATE INDEX VALUE WHICH COMES FROM INDEX.HTML.  SET INDEX = 0;
  $scope.stepIndex = 0;

  $scope.setStepIndex = function(selectedStep) {
    for (var i = 0; i < $scope.recipe.steps.length; i++) {
      if (selectedStep['description'] === $scope.recipe.steps[i]['description']) {
        $scope.stepIndex = i;
      }
    }
  };

  //CREATE STEPSREMAINING AND STEPSPASSED ARRAYS BY SPLICING COOKSTEPTIMES AND COOKSTEPS - THESE ARE WHAT SHOULD BE ENTERED IN AND THEY'LL BE INITIALIZED WITH COOK STEPS AND CHANGED WITH THE FUNCTION

  // $scope.stepsRemaining = function(index) {
  //   var remainingSteps = $scope.cookSteps.slice(index);
  //   for (var i = 0; i < remainingSteps.length; i++) {
  //     $('#step' + i).css({
  //       //this is simply the formatting for the list-group-item class.  can be refactored later on
  //       'color': 'black',
  //       'font-size': '14px',
  //       'font-family': 'Comfortaa, cursive',
  //       'font-weight': 'bold',
  //       'background-color': '#E9EBE3'
  //     });
  //   }
  // };
  $scope.stepsComplete = function(index) {
    //first, splice out everything from 0 through stepIndex
    //then, FOR EACH of those steps, apply the changes on those lines
    //STILL NEEDS TO ONLY DO CHECKBOX ONCE

    var completeSteps = $scope.cookSteps.slice(0, index);
    for (var i = 0; i < completeSteps.length; i++) {
      //completed steps
    $('#step' + i).css({
        'color': '#E9EBE3',
        'font-size': '14px',
        'font-weight': 'normal',
        'background-color': '#874B78'
      });
        // adding in the check-mark glyphicon
    $('#step' + i + ' small').append('<span class="glyphicon glyphicon-ok-circle"></span>');
    $('.glyphicon').css({
      'font-size': '25px',
      'float': 'right',
      'color': '#E9EBE3'
    });
    }
  };


  // creates the total timer
  var totalClock = FlipClock($('.total-cook'), $scope.recipe.time * 60, {
    clockFace: 'HourlyCounter',
    countdown: true,
    autoStart: false
  });

  // var i set here to increment through cook-steps
  //THIS WILL CHANGE TO STEPINDEX
  var i = 0;

  // sets the clock format based on step-duration
  var clockFormat = 'MinuteCounter';
  if ($scope.cookStepTimes[i] > 60) {
    clockFormat = 'HourlyCounter';
  }

  //creates the local timer
  var stepClock = new FlipClock($('.step-time'), $scope.cookStepTimes[i] * 60, {
    clockFace: clockFormat,
    countdown: true,
    autoStart: false
  });

  // var necessary to prevent clock autostart until initiated
  var cookingStarted = false;

  // creating a style for active ingredients
  var activeStyle = {
    'color': '#874B78',
    'font-size': '25px',
    'font-weight': 'bold',
    'background-color': '#FFE372'
  }

  // initiates the cooking process
  $scope.toggleCooking = function() {
    if (!cookingStarted) {
      totalClock.start();
      stepClock.start(function() {
        // styles the first step
          $('#step' + i).css(activeStyle);
        // appends audio onto first step at start
          $('#vid' + i).append('<source src="http://api.voicerss.org/?key=c005359f68ec4ab89c485808abf9c53c&hl=en-gb&src=' + $scope.cookSteps[i].description + '"' + ' type="audio/mpeg">')
        });
      cookingStarted = true;
    } else {
      totalClock.stop();
      stepClock.stop();
      cookingStarted = false;
    }
  }


//checks to see whether the step timer is done
  setInterval(function() {
    // if step timer is done, increment to the next step
    if (!stepClock.face.factory.running && cookingStarted) {
      i++;
      var nextStepTime = $scope.cookStepTimes[i] * 60;
      //stops the step timer once the incrementor is the array length
      if (i >= $scope.cookStepTimes.length) {
        stepClock.stop();
      }
      else {
        // styles specific steps based on whether they are active or complete
        $('#step' + i).css(activeStyle);
        $('#step' + (i-1)).css({
          'color': '#E9EBE3',
          'font-size': '14px',
          'font-weight': 'normal',
          'background-color': '#874B78'
        })
        // adding in the check-mark glyphicon
        $('#step' + (i-1) + ' small').append('<span class="glyphicon glyphicon-ok-circle"></span>');
        $('.glyphicon').css({
          'font-size': '25px',
          'float': 'right',
          'color': '#E9EBE3'
        });
        // initiating the next step countdown
        stepClock.setTime(nextStepTime);
        // cb function
        stepClock.start(function() {
          // appending audio onto each step
          $('#vid' + i).append('<source src="http://api.voicerss.org/?key=c005359f68ec4ab89c485808abf9c53c&hl=en-gb&src=' + $scope.cookSteps[i].description + '"' + ' type="audio/mpeg">')
        });
      }
    };
  }, 1000);
});
