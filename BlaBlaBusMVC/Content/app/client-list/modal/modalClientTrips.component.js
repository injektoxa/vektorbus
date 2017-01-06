'use strict';

// Register `modalClient` component, along with its associated controller and template
angular.
  module('modalClient').
  component('modalClientTrips', {
      templateUrl: 'Content/app/client-list/modal/modalClientTrips-template.html',
      bindings: {
          resolve: '<',
          close: '&',
          dismiss: '&'
      },
      controller: ['$filter', function ($filter) {
          var that = this;

          that.trips = {};
          that.client = {};

          that.$onInit = function () {
              that.trips = that.resolve.info.trips;
              that.client = that.resolve.info.client;
          };

          that.getClienPrice = function (clientTrips) {
              var found = $filter('filter')(clientTrips, { ClientId: that.client.Id }, true);
              return found[0].Price;
          };

          that.getClienAdditionalExpenses = function (clientTrips) {
              var found = $filter('filter')(clientTrips, { ClientId: that.client.Id }, true);
              return found[0].AdditionalExpenses;
          };

          that.getClientAgent = function (trip) {
              var clientTrip = trip.tripClients.find((client) => client.ClientId == that.client.Id);

              trip.agentName = clientTrip.AgentName;
          }

          that.cancel = function () {
              that.dismiss({ $value: 'cancel' });
          };
      }]
  });