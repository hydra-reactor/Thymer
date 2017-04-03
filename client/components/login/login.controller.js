(function () {
  'use strict';

  angular
    .module('thymer')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['authService', 'lock'];

  function LoginController(authService, lock) {

    console.log('login controller is clicked');

    var vm = this;

    vm.authService = authService;

    // Initiating our Auth0Lock
      // We need to play around with where this goes. -m
    var lock = new Auth0Lock(
      'H0GrORNEusyYOrbkUgsWuJWp9FYCVR7l',
      'thymer.auth0.com'
    );

    // Listening for the authenticated event
    lock.on("authenticated", function(authResult) {
      // Use the token in authResult to getUserInfo() and save it to localStorage
      lock.getUserInfo(authResult.accessToken, function(error, profile) {
        if (error) {
          console.log('cannot authenticate');
          return;
        }

        localStorage.setItem('accessToken', authResult.accessToken);
        localStorage.setItem('profile', JSON.stringify(profile));
      });
    });

    // The addEventListener portion of this causes an error. -m
    // document.getElementById('btn-login').addEventListener('click', function() {
    //   lock.show();
    // });

    // Verify that there's a token in localStorage
    var token = localStorage.getItem('accessToken');
    if (token) {
      showLoggedIn();
    }

    // Display the user's profile
    function showLoggedIn() {
      var profile = JSON.parse(localStorage.getItem('profile'));
      document.getElementById('nick').textContent = profile.nickname;
    }

  }
})();