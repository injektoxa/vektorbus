'use strict';

angular.
  module('core.agentReport').
  factory('AgentReport', ['$resource',
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