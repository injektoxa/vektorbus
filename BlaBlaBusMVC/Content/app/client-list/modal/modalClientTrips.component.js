'use strict';

// Register `modalClient` component, along with its associated controller and template
angular.
  module('modalClient').
  component('modalClientTrips', {
      templateUrl: 'client-list/modal/modalClientTrips-template.html',
      bindings: {
          resolve: '<',
          close: '&',
          dismiss: '&'
      },
      controller: [ '$filter',
          function ($filter) {
          var that = this;

          that.trips = {};
          that.client = {};
          that.headerTitle = "";

          that.$onInit = function () {
              that.trips = that.resolve.info.trips;
              that.client = that.resolve.info.client;
              that.headerTitle = "Информация о поездках клиента " + that.client.Name;
          };

          that.getClienPrice = function(clientTrips) {
              var found = $filter('filter')(clientTrips, { ClientId: that.client.Id }, true);
              return found[0].Price;
          };

          that.getClienAdditionalExpenses = function (clientTrips) {
              var found = $filter('filter')(clientTrips, { ClientId: that.client.Id }, true);
              return found[0].AdditionalExpenses;
          };

          that.cancel = function () {
              that.dismiss({ $value: 'cancel' });
          };
      }]
  });