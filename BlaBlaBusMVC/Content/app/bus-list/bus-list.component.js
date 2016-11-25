'use strict';

// Register `busList` component, along with its associated controller and template
angular.module('busList')
  .component('busList',
  {
    templateUrl: 'bus-list/bus-list.template.html',
    controller: [
      'Bus', '$scope',
      function(Bus, $scope) {
        var that = this;
        this.buses = Bus.query();
      }
    ]
  });