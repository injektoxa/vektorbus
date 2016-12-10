'use strict';

angular.
  module('core.driverReport').
  factory('DriverReport', ['$resource',
    function ($resource) {
        return $resource('/api/driverReports/', {}, {
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