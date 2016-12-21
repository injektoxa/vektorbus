'use strict';

angular.
  module('core.clientTrip').
  factory('ClientTrip', ['$resource',
    function ($resource) {
        return $resource('/api/clientTrips/:Id', {}, {
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