'use strict';

angular.
  module('clientCrud').
  component('clientCrud', {
  	templateUrl: 'client-list/client-crud/client-crud.template.html',
  	controller: ['Client', '$scope', function ClientCrudController(Client, $scope) {
  	        var self = this;
  	        self.client = {};
  	        self.add = function add(client) {
  	            Client.add(client);
  	            setTimeout(function () {
  	                $scope.$parent.$ctrl.clients = Client.query();
  	            }, 1000)
  	        }
  	        self.update = function (client) {
  	        }
  	    }
     ]
  });