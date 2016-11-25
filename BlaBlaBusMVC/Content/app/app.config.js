'use strict';

angular.
  module('VektorApp').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $routeProvider.   
        when('/clients', {
          template: '<client-list></client-list>'
        }).
        when('/clients/:clientId', {
          template: '<client-detail></client-detail>'
        }).
        when('/trips', {
          template: '<trip-list></trip-list>'
        }).
        when('/cities', {
           template: '<cities-list></cities-list>'
        }).
        when('/signup', {
            template: '<sign-up></signUp>'
        }).
        otherwise('/clients');
    }
  ]);