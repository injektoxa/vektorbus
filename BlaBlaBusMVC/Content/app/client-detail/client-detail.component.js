'use strict';

// Register `clientDetail` component, along with its associated controller and template
angular.
  module('clientDetail').
  component('clientDetail', {
    templateUrl: 'client-detail/client-detail.template.html',
    controller: ['$routeParams', 'Client',
      function ClientDetailController($routeParams, Client) {
        var self = this;
        self.client = Client.get({clientId: $routeParams.clientId}, function(client) {
          //self.setImage(client.images[0]);
        });

        //self.setImage = function setImage(imageUrl) {
        //  self.mainImageUrl = imageUrl;
        //};
      }
    ]
  });
