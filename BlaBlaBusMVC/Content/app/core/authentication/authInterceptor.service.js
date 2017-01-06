'use strict';
angular.module('core.authentication')
    .factory('authInterceptorService', ['$q', '$injector', '$location', 'localStorageService', function ($q, $injector, $location, localStorageService) {

        var authInterceptorServiceFactory = {};

        authInterceptorServiceFactory.request = function (config) {
            config.headers = config.headers || {};

            var authData = localStorageService.get('authorizationData');

            if (authData) {
                config.headers.Authorization = 'Bearer ' + authData.token;
            }

            return config;
        }

        authInterceptorServiceFactory.responseError = function (rejection) {
            if (rejection.status === 401) {
                var authService = $injector.get('AuthService');

                authService.logOut();
                $location.path('/login');
            }

            return $q.reject(rejection);
        }

        return authInterceptorServiceFactory;
    }]);