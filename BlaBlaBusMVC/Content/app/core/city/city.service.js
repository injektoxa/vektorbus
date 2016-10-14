'use strict';

angular.
  module('core.city').
  factory('City', ['$resource',
    function ($resource) {
        return $resource('/api/Cities/:Id', {}, {
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