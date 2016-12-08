'use strict';

// Register `clientTripList` component, along with its associated controller and template
angular.
  module('clientTripList').
  component('clientTripList', {
      templateUrl: 'clientTrip-list/clientTrip-list.template.html',
      controller: ['ClientTrip', '$scope', 'City', 'Agent',
        function (ClientTrip, $scope, City, Agent) {
            var that = this;

            this.addClientBlockVisible = false;
            this.clients = ClientTrip.query();
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

            this.showAddClientBlock = function () {
                that.addClientBlockVisible = !that.addClientBlockVisible;
            }

            this.remove = function (id) {
                ClientTrip.remove({ Id: id });

              setTimeout(function() {
                  that.clients = ClientTrip.query();
                },
                1000);
            }
        }
      ]
  });
