'use strict';

// Register `clientTripList` component, along with its associated controller and template
angular.
  module('clientTripList').
  component('clientTripList', {
      templateUrl: 'Content/app/clientTrip-list/clientTrip-list.template.html',
      controller: ['ClientTrip', '$scope', 'City', 'Agent',
        function (ClientTrip, $scope, City, Agent) {
            var that = this;

            this.clientFilter = '';
            this.clients = [];
            this.cities = City.query();
            this.agents = Agent.query();
            this.orderProp = 'Id';

            this.removeFromTrip = function (client) {
                var index = $scope.$parent.$ctrl.trip.tripClients.indexOf(client);
                $scope.$parent.$ctrl.trip.tripClients.splice(index, 1);
            }

            this.addToTrip = function (client) {
                if ($scope.$parent.$ctrl.trip.tripClients.indexOf(client) === -1) {
                    $scope.$parent.$ctrl.trip.tripClients.push(client);
                }
                else {
                    console.log("This item already exists");
                }
            }

            this.clientFilterAction = function () {
                if (that.clientFilter.length > 1) {
                    ClientTrip.query({ filter: that.clientFilter },
                        function(clientTrips) {
                            that.clients = clientTrips;
                        });
                } else {
                    that.clients = [];
                }
            };

            this.filterThrottled = _.debounce(that.clientFilterAction, 500);

            $scope.$watch('$ctrl.clientFilter', that.filterThrottled);

            $scope.$on('clearClientTripsEvent', function (event, params) {
                that.clientFilter = '';
                that.clients = [];
            });
        }
      ]
  });
