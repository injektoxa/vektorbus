'use strict';

angular.
  module('VektorApp').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.html5Mode({
         enabled: true
      });

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
        when('/buses', {
            template: '<bus-list></bus-list>'
        }).
        when('/cities', {
           template: '<cities-list></cities-list>'
        }).
        when('/signup', {
            template: '<sign-up></sign-up>'
        }).
        when('/login', {
            template: '<sign-in></sign-in>'
        }).
        when('/agents', {
            template: '<agent-list></agent-list>'
        }).
        when('/agentReports', {
            template: '<agent-reports></agent-reports>'
        }).
        when('/driverReports', {
            template: '<driver-reports></driver-reports>'
        }).
        otherwise('/login');
    }
  ]);