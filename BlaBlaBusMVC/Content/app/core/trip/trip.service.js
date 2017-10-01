angular.
  module('core.trip').
  factory('Trip', ['$resource',
    function ($resource) {
        return $resource('/api/trips/:Id', {}, {
            query: {
                method: 'GET',
                isArray: true
            },
            search: {
                method: 'GET',
                isArray: true,
                params: { query: 'query'}
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