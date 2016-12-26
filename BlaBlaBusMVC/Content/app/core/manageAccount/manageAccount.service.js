'use strict';

angular.
  module('core.manageAccount').
  factory('ManageAccountService', ['$http',
    function ($http) {
        var manageAccountFactory = {};

        manageAccountFactory.updateAccount = function (accountData) {
            return $http.put('/api/Account/', accountData).then(function(response) {
                return response;
            });
        }

        manageAccountFactory.getAccountInfo = function () {
            return $http.get('/api/Account/').then(function(response) {
                return response.data;
            });
        }

        return manageAccountFactory;
    }
  ]);