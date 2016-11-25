'use strict';

angular.
  module('core.authentication').
      factory('AuthService', ['localStorageService', '$http', '$q', function (localStorageService, $http, $q) {
          var authServiceFactory = {};

          authServiceFactory.authentication = {
              isAuth: false,
              userName: "",
          };

          authServiceFactory.saveRegistration = function (registration) {
              authServiceFactory.logOut();

              return $http.post('/api/register', registration).then(function (response) {
                  return response;
              });
          };

          authServiceFactory.logOut = function () {
            localStorageService.remove('authorizationData');

            authServiceFactory.isAuth = false;
            authServiceFactory.userName = "";
          };

          authServiceFactory.login = function (loginData) {
              var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

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