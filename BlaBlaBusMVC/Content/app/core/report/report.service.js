'use strict';

angular.
  module('core.report').
  factory('Report', ['$resource',
    function ($resource) {
        return $resource('/api/agentReports/', {}, {
            query: {
                method: 'GET',
                isArray: true,
                params: {
                    id: '@id',
                    dateFrom: '@dateFrom',
                    dateTo: '@dateTo'
                }
            }
        });
    }
  ]);