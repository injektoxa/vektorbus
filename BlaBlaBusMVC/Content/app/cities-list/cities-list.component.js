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

                  City.add({ name: cityName }, function (createdCity) {
                      that.cities.push(createdCity);
                      that.choosedPlace = '';
                  });
              }
          }

          this.removeCity = function (cityId) {
              City.delete({ id: cityId }, function onSuccess(deletedCity) {
                  that.cities = that.cities.filter((el) => el.Id != cityId);
              });
          }

          this.setCityFromAutocomplete = function (err, place) {
              that.city.name = place;
          }
      }]
  });
