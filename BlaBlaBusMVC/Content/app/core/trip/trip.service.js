angular.
  module('core.trip').
  factory('Trip', ['$resource',
    function ($resource) {
        return $resource('/api/trips/:Id', {}, {
            query: {
                method: 'GET',
                isArray: true
            },
            get: {
                method: 'GET',
                params: { Id: 'id' }
            },
            add: {
                method: 'POST'
            },
            update: {
                method: 'PUT'
            },
            remove: {
                method: 'DELETE'
            }
        });
    }
  ]);