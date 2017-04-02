(function () {

  'use strict';

  angular
    .module('thymer')
    .service('authService', authService);

  function authService(lock, authManager) {

    function login() {
      lock.show();
    }

    function logout() {
      localStorage.removeItem('id_token');
      authManager.unauthenticate();
    }

    // Set up the logic for when a user authenticates
    // This method is called from app.run.js
    function registerAuthenticationListener() {
      lock.on('authenticated', function (authResult) {
        localStorage.setItem('id_token', authResult.idToken);
        authManager.authenticate();
      });

      lock.on('authorization_error', function (err) {
        console.log(err);
      });
    }

    return {
      login: login,
      registerAuthenticationListener: registerAuthenticationListener
    };
  }
})();