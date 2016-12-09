    'use strict';

    angular.
    module('tripList').
    component('tripList', {
        templateUrl: 'trip-list/trip-list.template.html',
        controller: ['Trip', 'Bus','City','Driver', '$uibModal', '$scope',
        function (Trip, Bus, City, Driver, $uibModal, $scope) {
            var that = this;

            this.showAddTripForm = false;

            var dateNow = new Date();

            this.trip = {
                tripClients: [],
                startDate: dateNow,
                startTime: dateNow,
                endDate: dateNow,
                endTime: dateNow
            };

            this.trips = Trip.query();
            this.buses = Bus.query();
            this.cities = City.query();
            this.drivers = Driver.query();
            this.dateFormat = "dd-MMM-yyyy";
            this.dateOptions = {
                minDate: new Date(),
                showWeeks: false,
                startingDay: 1,
                initDate: dateNow
            };

            this.timeOptions = {
                minuteStep: 5
            }

            this.startDatePopup = {
                opened: false
            };
            this.startDateOpen = function() {
                that.startDatePopup.opened = true;
            };

            this.endDatePopup = {
                opened: false
            };
            this.endDateOpen = function () {
                that.endDatePopup.opened = true;
            };


            this.showAddForm = function () {
                that.showAddTripForm = !that.showAddTripForm;
            }

            this.add = function (trip) {
                that.submitted = true;
                var isValid = true;

                if (that.trip.tripClients.length === 0) {
                    $scope.form.$setValidity('isAnyClient', false);
                    isValid = false;
                }

                if (isValid) {
                    trip.clients = that.trip.tripClients;
                    trip.date = new Date(Date.UTC(
                        trip.startDate.getFullYear(),
                        trip.startDate.getMonth(),
                        trip.startDate.getDate(),
                        trip.startTime.getHours(),
                        trip.startTime.getMinutes()));
                    trip.arrivalDate = new Date(Date.UTC(
                        trip.endDate.getFullYear(),
                        trip.endDate.getMonth(),
                        trip.endDate.getDate(),
                        trip.endTime.getHours(),
                        trip.endTime.getMinutes()));
                    Trip.add(trip);
                }
            };

            this.openDriversList = function() {
                var modalOptions = {
                    animation: true,
                    backdrop: 'static',
                    size: 'lg',
                    component: 'driverList',
                    resolve: {
                        drivers: function() {
                            return that.drivers;
                        }
                    }
                };

                var modalInstance = $uibModal.open(modalOptions);

                modalInstance.result.then(function(drivers) {
                    that.drivers = drivers;
                });
            };

            $scope.$watchCollection('trip.tripClients', function (newValue, previousValue) {
                if (newValue && newValue.length > 0) {
                    $scope.form.$setValidity('isAnyClient', false);
                }
            });
        }]
    });