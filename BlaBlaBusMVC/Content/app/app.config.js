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
        otherwise('/clients');
    }
  ]);