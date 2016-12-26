'use strict';

const authDataResourceKey = "authorizationData";

angular.
  module('core.authentication').
      factory('AuthService', ['localStorageService', '$http', '$q', function (localStorageService, $http, $q) {
          var authServiceFactory = {};
          var observerCallbacks = [];

          var authData = localStorageService.get(authDataResourceKey);
          authServiceFactory.authData = {
              isAuth: authData != null,
              name: authData ? authData.name : "",
              role: authData ? authData.role : "guest",
          };

          authServiceFactory.registerObserverCallback = function (callback) {
              observerCallbacks.push(callback);
          };

          //call this when you know that authData has been changed
          var notifyObservers = function () {
              angular.forEach(observerCallbacks, function (callback) {
                  callback();
              });
          }

          authServiceFactory.saveRegistration = function (registration) {
              authServiceFactory.logOut();

              return $http.post('/api/Account/Register', registration).then(function (response) {
                  return response;
              });
          };

          authServiceFactory.logOut = function () {
              localStorageService.remove(authDataResourceKey);

              authServiceFactory.authData.isAuth = false;
              authServiceFactory.authData.role = "";
              authServiceFactory.authData.name = "";

              notifyObservers();
          };

          authServiceFactory.login = function (loginData) {
              var data = "grant_type=password&username=" + loginData.email + "&password=" + loginData.password;

              var deferred = $q.defer();

              $http.post('/api/token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                   .then(function (response) {
                       localStorageService.set(authDataResourceKey, { token: response.data.access_token, name: response.data.name, role: response.data.role });

                       authServiceFactory.authData.isAuth = true;
                       authServiceFactory.authData.name = response.data.name;
                       authServiceFactory.authData.role = response.data.role;

                       notifyObservers();

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