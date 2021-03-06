'use strict';

angular.
  module('core.driver').
  factory('Driver', ['$resource',
    function ($resource) {
        return $resource('/api/drivers/:Id', {}, {
            query: {
                method: 'GET',
                isArray: true
            },
            add: {
                method: 'POST',
            },
            update: {
              method: 'PUT'
            },
            remove: {
                method: 'DELETE',
                params: { Id: 'id' },
            }
        });
    }
  ]);