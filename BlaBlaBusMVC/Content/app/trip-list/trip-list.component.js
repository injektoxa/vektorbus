'use strict';

const commonDateOptions = {
    showWeeks: false,
    startingDay: 0
};

angular.
  module('tripList').
  component('tripList', {
      templateUrl: 'trip-list/trip-list.template.html',
      controller: ['Trip', 'Bus','City','Driver', '$uibModal', '$scope', 
        function TripListController(Trip, Bus, City, Driver, $uibModal, $scope) {
          var that = this;

          this.isShowingArrivalDatePicker = false;
          this.showAddTripForm = false;
          this.trip = {}
          this.trip.tripClients = [];
          this.trips = Trip.query();
          this.buses = Bus.query();
          this.cities = City.query();
          this.drivers = Driver.query();
          this.dateTimeFormat = "dd/MM/yyyy HH:mm";

          this.showAddForm = function () {
              that.showAddTripForm = !that.showAddTripForm;
          }

          this.add = function (trip) {
              trip.clients = that.trip.tripClients;
              Trip.add(trip);
          }

          this.dateTimeNow = function () {
              that.date = new Date();
          };

          this.dateTimeNow();

          this.toggleMinDate = function () {
              var minDate = new Date();

              minDate.setDate(minDate.getDate());
              that.dateOptions.minDate = that.dateOptions.minDate ? null : minDate;
          };

          this.dateOptions = commonDateOptions;
          this.arrivalDateOptions = commonDateOptions;

          this.toggleMinDate();

          this.open = function ($event, opened) {
              $event.preventDefault();
              $event.stopPropagation();
              that.dateOpened = true;
              that.isShowingArrivalDatePicker = true;
          };

          this.dateOpened = false;
          this.hourStep = 1;
          this.format = "dd-MMM-yyyy";
          this.minuteStep = 1;
          this.minTime = new Date(0, 0, 0, Math.max(1, that.date.getHours() - 2), 0, 0, 0);

          this.showMeridian = true;
          this.timeToggleMode = function () {
              that.showMeridian = !that.showMeridian;
          };

          this.resetHours = function () {
              that.date.setHours(1);
          };

          this.openDriversList = function () {
            var modalOptions = {
              animation: true,
              backdrop: 'static',
              size: 'lg',
              component: 'driverList',
              resolve: {
                drivers: function () {
                  return that.drivers;
                }
              }
            };

            var modalInstance = $uibModal.open(modalOptions);

            modalInstance.result.then(function (drivers) {
              that.drivers = drivers;
            });
          }

          //bootstrap datepicker doesn`t support ng-change event
          $scope.$watch('trip.date', function (nextValue, prevValue) {
              if (prevValue != nextValue) {
                  that.isShowingArrivalDatePicker = true;
                  that.arrivalDateOptions.minDate = nextValue;
              }
          });
      }]
  });