'use strict';

// Register `clientList` component, along with its associated controller and template
angular.
  module('clientList').
  component('clientList', {
      templateUrl: 'client-list/client-list.template.html',
      controller: ['Client','$scope', 'City', 'Agent',
        function ClientListController(Client, $scope, City, Agent) {
            var that = this;

            this.addClientBlockVisible = false;
            this.clients = Client.query();
            this.cities = City.query();
            this.agents = Agent.query();
            this.orderProp = 'Id';

            this.removeFromTrip = function (client) {
                var index = $scope.$parent.$ctrl.trip.tripClients.indexOf(client);
                $scope.$parent.trip.tripClients.splice(index, 1);
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
                Client.remove({ Id: id });

              setTimeout(function() {
                  that.clients = Client.query();
                },
                1000);
            }
        }
      ]
  });
