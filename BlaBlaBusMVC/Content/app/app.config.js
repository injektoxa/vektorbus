'use strict';

angular.
  module('VektorApp').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/clients', {
          template: '<client-list></client-list>'
        }).
        when('/clients/:clientId', {
          template: '<client-detail></client-detail>'
        }).
        otherwise('/clients');
    }
  ]);
