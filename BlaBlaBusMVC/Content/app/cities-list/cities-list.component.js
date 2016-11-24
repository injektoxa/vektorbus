'use strict';

angular.
  module('citiesList').
  component('citiesList', {
      templateUrl: 'cities-list/cities-list.template.html',
      controller: ['City', function CitiesListController(City) {
          this.cities = City.query();
      }]
  });
