angular.
  module('core.trip').
  factory('Trip', ['$resource',
    function ($resource) {
        return $resource('/api/trips/:Id', {}, {
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