    'use strict';

    angular.
    module('tripList').
    component('tripList', {
        templateUrl: 'trip-list/trip-list.template.html',
        controller: ['Trip', 'Bus', 'City', 'Driver', '$uibModal', '$scope', 'PdfMaker',
        function (Trip, Bus, City, Driver, $uibModal, $scope, PdfMaker) {
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
                that.createPDF();
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

            this.createPDF = function (trip) {
                var tableBody = [[
                    { text: 'Имя Фамилия', style: 'tableHeader' },
                    { text: 'Телефон', style: 'tableHeader' },
                    { text: 'Куда', style: 'tableHeader' },
                    { text: 'Откуда', style: 'tableHeader' },
                    { text: 'Стоимость', style: 'tableHeader' },
                    { text: 'Не выходит', style: 'tableHeader' },
                    { text: 'Статус', style: 'tableHeader' }]];

                for (var i = 0; i < trip.clients.length; i++) {
                    tableBody.push([
                        trip.clients[i].Name,
                        trip.clients[i].Phone,
                        trip.clients[i].To,
                        trip.clients[i].From,
                        trip.clients[i].Price.toString(),
                        trip.clients[i].IsStayInBus ? 'Да' : '',
                        (trip.clients[i].HasMinorChild ? 'С ребенком; ' : '') + (trip.clients[i].HasDisability ? 'Инвалид' : '')
                    ]);
                }
                var options = {
                    docDefinition: {
                        pageOrientation: 'portrait',
                        fontSize: 12,
                        content: [
                            {
                                text:
                                  trip.cityFromName.concat(' --> ', trip.cityToName, ' ', trip.busRegistrationNumber, ' ', trip.date)
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

            $scope.$watchCollection('trip.tripClients', function (newValue, previousValue) {
                if (newValue && newValue.length > 0) {
                    $scope.form.$setValidity('isAnyClient', false);
                }
            });
        }]
    });