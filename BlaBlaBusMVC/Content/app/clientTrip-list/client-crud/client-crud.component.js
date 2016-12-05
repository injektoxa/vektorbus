'use strict';

angular.
  module('clientCrud').
  component('clientCrud', {
  	templateUrl: 'clientTrip-list/client-crud/client-crud.template.html',
  	controller: ['Client', '$scope', function ClientCrudController(Client, $scope) {
  	        var self = this;
  	        self.client = {};
  	        self.add = function add(client) {
  	            Client.add(client);
  	            setTimeout(function () {
  	                $scope.$parent.$ctrl.clients = Client.query();
  	                client.name = '';
  	                client.phone = '';
  	                client.comments = '';
  	                client.hasDiscount = false;
  	            }, 1000)
  	            $scope.$parent.$ctrl.addClientBlockVisible = false;
  	        }
  	        self.update = function (client) {
  	        }
  	    }
     ]
  });