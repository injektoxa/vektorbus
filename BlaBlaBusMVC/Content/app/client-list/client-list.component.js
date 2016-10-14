'use strict';

// Register `clientList` component, along with its associated controller and template
angular.
  module('clientList').
  component('clientList', {
      templateUrl: 'client-list/client-list.template.html',
      controller: ['Client',
        function ClientListController(Client) {
            var that = this;

            this.tripClients = [];

            this.clients = Client.query();
            this.orderProp = 'Id';

            this.removeFromTrip = function (client) {
                var index = that.tripClients.indexOf(client);
                that.tripClients.splice(index, 1);
            }
            this.addToTrip = function (client) {
                if (that.tripClients.indexOf(client) === -1) {
                    that.tripClients.push(client);
                }
                else {
                    console.log("This item already exists");
                }
            }

            this.remove = function (id) {
                Client.remove({ Id: id });

                setTimeout(function () {
                    that.clients = Client.query();
                }, 1000)
            }
        }
      ]
  });
