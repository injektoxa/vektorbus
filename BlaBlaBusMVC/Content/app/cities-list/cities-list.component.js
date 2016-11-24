'use strict';

angular.
  module('citiesList').
  component('citiesList', {
      templateUrl: 'cities-list/cities-list.template.html',
      controller: ['City', function CitiesListController(City) {
          var that = this;

          this.cities = City.query();
          this.showAddCityForm = false;
          this.city = {};

          this.showAddForm = function () {
              that.showAddCityForm = !that.showAddCityForm;
          }

          this.saveCity = function (city) {
              let thatCity = city;
              City.add(city);
              that.showAddCityForm = false;
              setTimeout(function () {
                  that.cities = City.query();
                  thatCity = {};
              }, 100);
          }
      }]
  });
