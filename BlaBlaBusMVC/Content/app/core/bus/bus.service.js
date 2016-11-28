'use strict';

angular.
  module('core.bus').
  factory('Bus', ['$resource',
    function ($resource) {
        return $resource('/api/buses/:Id', {}, {
            query: {
                method: 'GET',
                isArray: true
            },
            add: {
                method: 'POST'
            },
            update: {
              method: 'PUT'
            },
            remove: {
                method: 'DELETE',
                params: { Id: 'id' }
            }
        });
    }
  ]);