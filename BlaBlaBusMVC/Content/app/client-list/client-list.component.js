'use strict';

// Register `clientList` component, along with its associated controller and template
angular.module('clientList')
  .component('clientList',
  {
     templateUrl: 'Content/app/client-list/client-list.template.html',
     controller: [
      'Client', 'Trip', '$scope', '$uibModal',
      function (Client,Trip, $scope, $uibModal) {
        var that = this;
        that.clients = Client.query();
        that.client = {};

        var modalOptions = {
          animation: true,
          backdrop: 'static',
          component: 'modalClient',
          resolve: {
            client: function() {
              return that.client;
            }
          }
        };

        that.addClient = function() {
          var modalInstance = $uibModal.open(modalOptions);

          modalInstance.result.then(function(client) {
            that.clients.push(client);
            that.clearClient();
          });
        };

        that.editClient = function(client) {
          that.client = client;
          var modalInstance = $uibModal.open(modalOptions);

          modalInstance.result.then(function(client) {
            that.client = client;
            Client.update({ id: client.Id },
              client,
              that.clearClient);
          }, that.clearClient);
        };

        that.deleteClient = function(id) {
          Client.delete({ id: id },
            function onSuccess(deletedClient) {
              var index = that.clients.map(function (e) { return e.Id }).indexOf(deletedClient.Id);
              if (index > -1) {
                that.clients.splice(index, 1);
              }
            });
        };

        that.clientInfo = function(client) {
            Trip.query({ clientId: client.Id }, function (clientTrips) {
                var options = {
                    animation: true,
                    backdrop: 'static',
                    component: 'modalClientTrips',
                    size: 'lg',
                    resolve: {
                        info: function () {
                            return {
                                client: client,
                                trips: clientTrips
                            };
                        }
                    }
                };
                $uibModal.open(options);
            });
        };

        that.clearClient = function() {
            that.client = {};
        };
      }
    ]
  });