'use strict';

angular.
  module('core.authentication').
      factory('AuthService', ['localStorageService', '$http', '$q', function (localStorageService, $http, $q) {
          var authServiceFactory = {};

          authServiceFactory.authentication = {
              isAuth: false,
              email: "",
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
              var data = "grant_type=password&email=" + loginData.emai9l + "&password=" + loginData.password;

              if (loginData.useRefreshTokens) {
                  data = data + "&client_id=" + ngAuthSettings.clientId;
              }

              var deferred = $q.defer();

              //TODO: Test this block of code
              $http.post('/api/login' + token, data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                  localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName, refreshToken: ""});

                  authServiceFactory.authentication.isAuth = true;
                  authServiceFactory.authentication.userName = loginData.userName;

                  deferred.resolve(response);
              }).error(function (err, status) {
                  authServiceFactory.logOut();
                  deferred.reject(err);
              });

              return deferred.promise;
          };

          return authServiceFactory;
        }
      ]);