'use strict';

angular.
  module('core.agent').
  factory('Agent', ['$resource',
    function ($resource) {
        return $resource('/api/agents/:Id', {}, {
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