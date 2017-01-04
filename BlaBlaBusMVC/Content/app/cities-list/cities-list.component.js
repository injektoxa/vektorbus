'use strict';

angular.
  module('citiesList').
  component('citiesList', {
      templateUrl: 'Content/app/cities-list/cities-list.template.html',
      controller: ['City', '$scope', function CitiesListController(City, $scope) {
          var that = this;

          this.cities = City.query();
          this.showAddCityForm = false;
          this.choosedPlace = '';

          this.showAddForm = function () {
              that.showAddCityForm = !that.showAddCityForm;
          }

          $scope.autocompleteOptions = {
              componentRestrictions: { country: 'ukr' },
              types: ['(cities)']
          }

          this.saveCity = function () {
              if (that.choosedPlace) {
                  that.showAddCityForm = false;
                  let cityName = that.choosedPlace.name ? that.choosedPlace.name : that.choosedPlace;

                  City.add({ name: cityName }, function () {
                      that.cities = City.query();
                      that.choosedPlace = '';
                  });
              }
          }

          this.removeCity = function (cityId) {
              City.remove({ id: cityId }), function () {
                  that.cities = that.cities.filter((el) => el.id != cityId);
              };
          }

          this.setCityFromAutocomplete = function (err, place) {
              that.city.name = place;
          }
      }]
  });
