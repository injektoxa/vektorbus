'use strict';

angular.
  module('core.manageAccount').
  factory('ManageAccountService', ['$http', '$q',
    function ($http, $q) {
        var manageAccountFactory = {};

        manageAccountFactory.updateAccount = function(accountData) {
            $http.put('/api/Account/ManageAccount', accountData).then(function (response) {
                return response;
            });
        }

        return manageAccountFactory;
    }
  ]);