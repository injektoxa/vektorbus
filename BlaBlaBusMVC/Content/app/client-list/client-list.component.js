'use strict';

// Register `clientList` component, along with its associated controller and template
angular.
  module('clientList').
  component('clientList', {
      templateUrl: 'client-list/client-list.template.html',
      controller: ['Client',
        function ClientListController(Client) {
            var that = this;

            this.clients = Client.query();
            this.orderProp = 'Id';

            this.remove = function (id) {
                Client.remove({ Id: id });

                setTimeout(function () {
                    that.clients = Client.query();
                }, 1000)
            }
        }
      ]
  });
