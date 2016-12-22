'use strict';

angular.
  module('core.authentication').
      factory('AuthService', ['localStorageService', '$http', '$q', function (localStorageService, $http, $q) {
          var authServiceFactory = {};

          authServiceFactory.authentication = {
              isAuth: false,
              email: ""
          };

          authServiceFactory.saveRegistration = function (registration) {
              authServiceFactory.logOut();

              return $http.post('/api/Account/Register', registration).then(function (response) {
                  return response;
              });
          };

          authServiceFactory.logOut = function () {
            localStorageService.remove('authorizationData');

            authServiceFactory.isAuth = false;
            authServiceFactory.email = "";
          };

          authServiceFactory.login = function (loginData) {
              var data = "grant_type=password&username=" + loginData.email + "&password=" + loginData.password;

              var deferred = $q.defer();

              $http.post('/token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }})
                   .then(function (response) {
                      localStorageService.set('authorizationData', { token: response.access_token, email: loginData.email});

                      authServiceFactory.authentication.isAuth = true;
                      authServiceFactory.authentication.email = loginData.email;

                      deferred.resolve(response);
                   },
                   function (err, status) {
                      authServiceFactory.logOut();
                      deferred.reject(err);
                   });   

              return deferred.promise;
          };

          return authServiceFactory;
        }
      ]);