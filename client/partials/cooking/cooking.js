angular.module('thymer.cooking', [])

.controller('cookingController', function($scope, Recipes, $location, $rootScope) {
  $rootScope.social.title = 'Cooking';

  // toggles Cooking tab visibility in the nav bar
  Recipes.visible();

  $scope.go = Recipes.go;

  // allows user to start and stop the timer by clicking on the clock
  // and by pressing the 'space' bar. Also styles slider based on these events
  //  $scope.toggleOnAndOff = function() {
  //   if($('#checkbox').is(':checked')) {
  //     $scope.toggleCooking();
  //     $('#checkbox').attr('checked', false);
  //   } else {
  //     $scope.toggleCooking();
  //     $('#checkbox').attr('checked', true);
  //   }
  // }



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
        for(var i = 0; i = $scope.cookSteps.length; i++) {
          $('#vid' + i).get(0).pause();
        }
        $scope.stepIndex = 0;


        //
    };
  });
  // var necessary to prevent clock autostart until initiated
  var cookingStarted = false;
  // stops the cooking cycle when changing tabs
  // this is NECESSARY when leaving the cooking tab if the cooking process
  // has not been stopped
  $scope.stopCooking = function() {
    totalClock.stop();
    stepClock.stop();
  };

  $scope.startCooking = function() {
    totalClock.start();
    stepClock.start();
  };

  $scope.toggleOnAndOff = function() {
    cookingStarted = !cookingStarted;
    if (cookingStarted) {
      $scope.startCooking();
    } else {
      $scope.stopCooking();
    }
  };

  // gets the clicked on recipe from searchRecipes
  $scope.recipe = Recipes.getCurrentRecipe();

  $scope.cookSteps = [];
  $scope.cookStepTimes = [];

  //sort through and organize step information
  $scope.recipe.steps.forEach(function(step) {
    $scope.cookStepTimes.push(step.totalMinutes);
    $scope.cookSteps.push(step);
  });

// creating a style for active ingredients
  // var activeStyle = {
  //   'color': '#874B78',
  //   'font-size': '25px',
  //   'font-weight': 'bold',
  //   'background-color': '#FFE372'
  // };

  // $scope.custom = true;
  // $scope.toggleCustom = function() {
  //   $scope.custom = $scope.custom === false ? true : false;
  // };














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

  $scope.timeRemaining = $scope.recipe.time;

  $scope.stepsExecute = function(index) {
    //first, splice out everything from 0 through stepIndex
    //then, FOR EACH of those steps, apply the changes on those lines
    //STILL NEEDS TO ONLY DO CHECKBOX ONCE
    if (index === $scope.recipe.steps.length) {
      return;
    }

    $scope.stopCooking();
    var completeSteps = $scope.cookSteps.slice(0, index);
    var remainingSteps = $scope.cookSteps.slice(index);
    console.log(completeSteps);
    console.log(remainingSteps);

      for (var i = 0; i < completeSteps.length; i++) {
        //completed steps
        // var oldStep = $('#step' + i);
        // console.log(oldStep.html());
        $('#step' + i).addClass('completed-list-group-item');
        // console.log($('#step' + i));
        $('#vid' + i).get(0).pause();
      }
      // console.log(remainingSteps);

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
    };
    $scope.timeRemaining = minRemain;
    console.log(minRemain);
    totalClock = FlipClock($('.total-cook'), $scope.timeRemaining * 60, {
      clockFace: 'HourlyCounter',
      countdown: true,
      autoStart: false
    });
    // totalClock.start();
    stepClock.setTime(remainingSteps[0].totalMinutes * 60);
        // cb function
          // $('#vid' + (i - 1)).removeAttr('autoplay');
    $scope.startCooking();

      // appending audio onto each step
    // if (i >= 1) {
    //   for (var k = 0; k < i; k++) {
    //     $('#vid' + k).get(0).pause();
    //   }
    // }
    $('#vid' + index).append('<source src="http://api.voicerss.org/?key=c005359f68ec4ab89c485808abf9c53c&hl=en-gb&src=' + $scope.cookSteps[index].description + '"' + ' type="audio/mpeg">');

    $('#step' + index).addClass('active-list-group-item');

    //go through everything else

  setInterval(function() {

    $(window).on('hashchange', function() {
      $scope.stopCooking();
      clearInterval();
      // for (var i = 0; i = $scope.cookSteps.length; i++) {
      //   $('#vid' + i).get(0).pause();
      // }
      // $scope.stepIndex = 0;
      console.log('The new Step Index is: ' + $scope.stepIndex);
    });
    // } else if ($scope.stepIndex !== index) {
    //   clearInterval();
    //   $scope.stepsExecute(index);
  }, 1000);
  if (!stepClock.face.factory.running) {
    $scope.stepsExecute(index + 1);
  }

    if (!stepClock.face.factory.running) {
      $scope.stepsExecute(index + 1);
    // } else if ($scope.stepIndex !== index) {
    //   clearInterval();
    //   $scope.stepsExecute(index);
    }
  }, 1000);

};



























    // creates the total timer (sets it initially)
  var totalClock = FlipClock($('.total-cook'), $scope.timeRemaining * 60, {
    clockFace: 'HourlyCounter',
    countdown: true,
    autoStart: false
  });

  // var i set here to increment through cook-steps
  //THIS WILL CHANGE TO STEPINDEX
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



  // initiates the cooking process
  // $scope.toggleCooking = function() {
  //   if (!cookingStarted) {
  //     totalClock.start();
  //     stepClock.start(function() {
  //       // styles the first step
  //         $('#step' + i).css(activeStyle);
  //       // appends audio onto first step at start
  //         $('#vid' + i).append('<source src="http://api.voicerss.org/?key=c005359f68ec4ab89c485808abf9c53c&hl=en-gb&src=' + $scope.cookSteps[i].description + '"' + ' type="audio/mpeg">')
  //       });
  //     cookingStarted = true;
  //   } else {
  //     totalClock.stop();
  //     stepClock.stop();
  //     cookingStarted = false;
  //   }
  // }


//checks to see whether the step timer is done
//THIS HAS TO BE WRAPPED INSIDE A FUNCTION THAT CAN BE INVOKED

  // $scope.goThroughSteps = function() {
    // setInterval(function() {
    //   // if step timer is done, increment to the next step
    //   if (!stepClock.face.factory.running && cookingStarted) {
    //     i++;
    //     var nextStepTime = $scope.cookStepTimes[i] * 60;
    //     //stops the step timer once the incrementor is the array length
    //     if (i >= $scope.cookStepTimes.length) {
    //       stepClock.stop();
    //     }
    //     else {
    //       // styles specific steps based on whether they are active or complete
    //       $('#step' + i).css(activeStyle);
    //       $('#step' + (i-1)).css({
    //         'color': '#E9EBE3',
    //         'font-size': '14px',
    //         'font-weight': 'normal',
    //         'background-color': '#874B78'
    //       })
    //       // adding in the check-mark glyphicon
    //       $('#step' + (i-1) + ' small').append('<span class="glyphicon glyphicon-ok-circle"></span>');
    //       $('.glyphicon').css({
    //         'font-size': '25px',
    //         'float': 'right',
    //         'color': '#E9EBE3'
    //       });
    //       // initiating the next step countdown
    //       stepClock.setTime(nextStepTime);
    //       // cb function
    //       stepClock.start(function() {
    //         // appending audio onto each step
    //         $('#vid' + i).append('<source src="http://api.voicerss.org/?key=c005359f68ec4ab89c485808abf9c53c&hl=en-gb&src=' + $scope.cookSteps[i].description + '"' + ' type="audio/mpeg">')
    //       });
    //     }
    //   };
    // }, 1000);
  // };
  // $scope.goThroughSteps();

});
