    'use strict';

    angular.
    module('tripList').
    component('tripList', {
        templateUrl: 'trip-list/trip-list.template.html',
        controller: ['Trip', 'Bus', 'City', 'Driver', '$uibModal', '$scope', 'PdfMaker',
        function (Trip, Bus, City, Driver, $uibModal, $scope, PdfMaker) {
            var that = this;

            this.showAddTripForm = false;
            this.isEditMode = false;
            this.dateNow = new Date();

            this.trip = {
                tripClients: [],
                startDate: that.dateNow,
                startTime: that.dateNow,
                endDate: that.dateNow,
                endTime: that.dateNow
            };

            this.trips = Trip.query();
            this.buses = Bus.query();
            this.cities = City.query();
            this.drivers = Driver.query();
            this.dateFormat = "dd-MMM-yyyy";
            this.dateOptions = {
                minDate: new Date(),
                showWeeks: false,
                startingDay: 1
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

            this.add = function () {
                that.submitted = true;

                if (that.trip.tripClients.length === 0) {
                    $scope.form.$setValidity('isAnyClient', false);
                    return;
                }
                if ($scope.form.$invalid) {
                    return;
                }

                if (that.isEditMode) {
                    that.update();
                } else {
                    that.create();
                }
            };

            this.create = function () {
                that.joinTripDateAndTime();
                Trip.add(that.trip, function (createdTrip) {
                    that.trips.push(createdTrip);
                    that.showAddTripForm = false;
                    that.clearTripModel();
                });
            };

            this.update = function() {
                that.joinTripDateAndTime();
                Trip.update(
                    { id: that.trip.id },
                    that.trip,
                    function (updatedTrip) {
                        that.showAddTripForm = false;
                        that.clearTripModel();
                    });
            };

            this.clearTripModel = function () {
                that.dateNow = new Date();
                that.isEditMode = false;
                that.trip = {
                    tripClients: [],
                    startDate: that.dateNow,
                    startTime: that.dateNow,
                    endDate: that.dateNow,
                    endTime: that.dateNow
                };
                that.submitted = false;
                $scope.form.$setPristine();
                $scope.form.$setUntouched();
                $scope.$broadcast('clearClientTripsEvent');
            };

            this.joinTripDateAndTime = function() {
                that.trip.date = new Date(Date.UTC(
                    that.trip.startDate.getFullYear(),
                    that.trip.startDate.getMonth(),
                    that.trip.startDate.getDate(),
                    that.trip.startTime.getHours(),
                    that.trip.startTime.getMinutes()));
                that.trip.arrivalDate = new Date(Date.UTC(
                    that.trip.endDate.getFullYear(),
                    that.trip.endDate.getMonth(),
                    that.trip.endDate.getDate(),
                    that.trip.endTime.getHours(),
                    that.trip.endTime.getMinutes()));
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

            this.createPDF = function (trip) {
                var tableBody = [[
                    { text: 'Имя Фамилия', style: 'tableHeader' },
                    { text: 'Телефон', style: 'tableHeader' },
                    { text: 'Куда', style: 'tableHeader' },
                    { text: 'Откуда', style: 'tableHeader' },
                    { text: 'Стоимость', style: 'tableHeader' },
                    { text: 'Не выходит', style: 'tableHeader' },
                    { text: 'Статус', style: 'tableHeader' }]];

                for (var i = 0; i < trip.tripClients.length; i++) {
                    tableBody.push([
                        trip.tripClients[i].Name,
                        trip.tripClients[i].Phone,
                        trip.tripClients[i].To,
                        trip.tripClients[i].From,
                        trip.tripClients[i].Price.toString(),
                        trip.tripClients[i].IsStayInBus ? 'Да' : '',
                        (trip.tripClients[i].HasMinorChild ? 'С ребенком; ' : '') + (trip.tripClients[i].HasDisability ? 'Инвалид' : '')
                    ]);
                }
                var bus = trip.bus != null ? trip.bus.FriendlyName + ' ' + trip.bus.RegistrationNumber + ', ' : '';
                var driver = trip.driver != null ? 'Водитель: ' + trip.driver.FullName : '';

                var options = {
                    docDefinition: {
                        pageOrientation: 'portrait',
                        fontSize: 12,
                        content: [
                            {
                                text:
                                  trip.cityFrom.Name.concat(' --> ', trip.cityTo.Name, ' ', trip.date)
                            },
                            {
                                text: bus + driver
                            },
                            {
                                text: 'Обязательные расходы: ' + trip.compulsoryExpenses
                            },
                            {
                                text: 'Дополнительные расходы: ' + trip.unexpectedExpenses + ' (' + trip.unexpectedExpensesComments + ')'
                            },
                            {
                                text: ' '
                            },
                            {
                                table: {
                                    headerRows: 1,
                                    body: tableBody
                                }
                            }
                            ]
                    }
                }

                PdfMaker.createAndDownload(options);
            }

            this.editTrip = function (trip) {
                that.isEditMode = true;
                that.trip = trip;
                var startDate = new Date(trip.date);
                var endDate = new Date(trip.arrivalDate);
                that.trip.startDate = startDate;
                that.trip.startTime = startDate;
                that.trip.endDate = endDate;
                that.trip.endTime = endDate;
                that.showAddTripForm = true;
            };

            $scope.$watchCollection('$ctrl.trip.tripClients', function (newValue, previousValue) {
                if (newValue && newValue.length > 0) {
                    $scope.form.$setValidity('isAnyClient', true);
                }
            });
        }]
    });