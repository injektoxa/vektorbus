'use strict';

angular.
  module('tripList').
  component('tripList', {
      templateUrl: 'trip-list/trip-list.template.html',
      controller: ['Trip', 'Bus','City', function TripListController(Trip, Bus, City) {
          var that = this;

          this.showAddTripForm = false;

          this.trips = Trip.query();
          this.buses = Bus.query();
          this.cities = City.query();

          this.showAddForm = function () {
              that.showAddTripForm = !that.showAddTripForm;
          }

          this.add = function (trip) {
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

          this.dateOptions = {
              showWeeks: false,
              startingDay: 0
          };

          this.toggleMinDate();

          this.open = function ($event, opened) {
              $event.preventDefault();
              $event.stopPropagation();
              that.dateOpened = true;
          };

          this.dateOpened = false;
          this.hourStep = 1;
          this.format = "dd-MMM-yyyy";
          this.minuteStep = 1;
          // add min-time="minTime" to datetimepicker to use this value 
          this.minTime = new Date(0, 0, 0, Math.max(1, that.date.getHours() - 2), 0, 0, 0);

          this.showMeridian = true;
          this.timeToggleMode = function () {
              that.showMeridian = !that.showMeridian;
          };

          //this.$watch("date", function (date) {
          //    // read date value
          //}, true);

          this.resetHours = function () {
              that.date.setHours(1);
          };
      }]
  });