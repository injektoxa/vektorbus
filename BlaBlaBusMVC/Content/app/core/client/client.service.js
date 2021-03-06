'use strict';

angular.
  module('core.client').
  factory('Client', ['$resource',
    function ($resource) {
        return $resource('/api/clients/:Id', {}, {
            query: {
                method: 'GET',
                isArray: true
            },
            add: {
                method: 'POST',
            },
            remove: {
                method: 'DELETE',
                params: { Id: 'id' },
            }
        });
    }
  ]);