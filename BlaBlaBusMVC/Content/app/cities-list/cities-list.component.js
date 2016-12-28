'use strict';

angular.
  module('citiesList').
  component('citiesList', {
      templateUrl: 'Content/app/cities-list/cities-list.template.html',
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
              that.showAddCityForm = false;

              City.add({ name: place.name }, function onSuccess(createdBus) {
                 that.cities = City.query();
                 that.choosedPlace = '';
              });
          }

          this.setCityFromAutocomplete = function(err, place){
              that.city.name = place;
          }
      }]
  });
