'use strict';

angular.
  module('citiesList').
  component('citiesList', {
      templateUrl: 'cities-list/cities-list.template.html',
      controller: ['City', '$scope', function CitiesListController(City, $scope) {
          var that = this;

          this.cities = City.query();
          this.showAddCityForm = false;

          this.showAddForm = function () {
              that.showAddCityForm = !that.showAddCityForm;
          }

          $scope.autocompleteOptions = {
              componentRestrictions: { country: 'ukr' },
              types: ['(cities)']
          }

          this.saveCity = function (place) {
              let thatPlace = place;

              City.add({ name: place.name });
              that.showAddCityForm = false;
              setTimeout(function () {
                  that.cities = City.query();
                  thatPlace = '';
              }, 100);
          }

          this.setCityFromAutocomplete = function(err, place){
              that.city.name = place;
          }
      }]
  });
