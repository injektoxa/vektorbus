'use strict';

angular.
module('tripList').
component('tripList', {
    templateUrl: 'Content/app/trip-list/trip-list.template.html',
    controller: ['Trip', 'Bus', 'City', 'Driver', '$uibModal', '$scope', 'PdfMaker', '$filter', 'googleMapsService', 'tripCashService',
        function (Trip, Bus, City, Driver, $uibModal, $scope, PdfMaker, $filter, googleMapsService, tripCashService) {
            var that = this;

            this.showAddTripForm = false;
            this.isEditMode = false;
            this.dateNow = new Date();
            this.mapCenterLatLng = '49.361625, 32.139730';

            this.trip = {
                tripClients: [],
                compulsoryExpenses: [],
                unexpectedExpenses: [],
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

            this.startDateOpen = function () {
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

            this.update = function () {
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

            this.joinTripDateAndTime = function () {
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
            };

            this.createPDF = function (trip) {
                var tableBody = [
                    [
                        { text: 'Имя Фамилия', style: 'tableHeader' },
                        { text: 'Телефон', style: 'tableHeader' },
                        { text: 'Куда', style: 'tableHeader' },
                        { text: 'Откуда', style: 'tableHeader' },
                        { text: 'Стоимость', style: 'tableHeader' },
                        { text: 'Не выходит', style: 'tableHeader' },
                        { text: 'Статус', style: 'tableHeader' }
                    ]
                ];

                for (var i = 0; i < trip.tripClients.length; i++) {
                    tableBody.push([
                        trip.tripClients[i].Name,
                        trip.tripClients[i].Phone,
                        trip.tripClients[i].To ? trip.tripClients[i].To : '',
                        trip.tripClients[i].From ? trip.tripClients[i].From : '',
                        trip.tripClients[i].Price.toString(),
                        trip.tripClients[i].IsStayInBus ? 'Да' : '',
                        (trip.tripClients[i].HasMinorChild ? 'С ребенком; ' : '') +
                        (trip.tripClients[i].HasDisability ? 'Инвалид' : '')
                    ]);
                }

                //pdfMake doesnt work with initializing via variable
                var compolsuryExpenseTable = [[{ text: 'Стоимость', style: 'tableHeader' }, { text: 'Комментарий', style: 'tableHeader' }]];
                var unexpectedExpenseTable = [[{ text: 'Стоимость', style: 'tableHeader' }, { text: 'Комментарий', style: 'tableHeader' }]];

                trip.compulsoryExpenses.map((expense) =>
                    compolsuryExpenseTable.push([
                         expense.Cost.toString(),
                         expense.Comment
                    ]));

                trip.unexpectedExpenses.map((expense) =>
                    unexpectedExpenseTable.push([
                         expense.Cost.toString(),
                         expense.Comment
                    ]));

                var bus = trip.bus != null ? trip.bus.FriendlyName + ' ' + trip.bus.RegistrationNumber + ', ' : '';
                var driver = trip.driver != null ? 'Водитель: ' + trip.driver.FullName : '';
                var fileName = trip.cityFrom.Name.concat(' - ', trip.cityTo.Name, ' ', $filter('date')(trip.date, "yyyy/MM/dd"), '.pdf');

                googleMapsService.getGoogleMapsImage(trip.cityFrom.Name, trip.cityTo.Name, that.getTripWaypoints(trip.tripClients),
                   function (base64Img) {
                       var options = {
                           fileName: fileName,
                           docDefinition: {
                               pageOrientation: 'portrait',
                               fontSize: 12,
                               content: [
                                   {
                                       text: trip.cityFrom.Name.concat(' --> ', trip.cityTo.Name, ' ', $filter('date')(trip.date, "yyyy-MM-dd HH:mm"))
                                   },
                                   {
                                       text: bus + driver
                                   },
                                   {
                                       text: ' '
                                   },
                                   {
                                       columns: [
                                       {
                                           width: '50%',
                                           text: 'Обязательные расходы:'
                                       },
                                       {
                                           width: '50%',
                                           text: 'Дополнительные расходы:'
                                       }]
                                   },
                                   {
                                       columns: [
                                       {
                                           width: '50%',
                                           table: {
                                               headerRows: 1,
                                               body: compolsuryExpenseTable
                                           }
                                       },
                                       {
                                           width: '50%',
                                           table: {
                                               headerRows: 1,
                                               body: unexpectedExpenseTable
                                           }
                                       }]
                                   },
                                   {
                                       text: ' '
                                   },
                                   {
                                       text: 'Касса водителя: ' + tripCashService.countDriverCashBox(trip)
                                   },
                                   {
                                       text: ' '
                                   },
                                   {
                                       text: 'Клиенты:'
                                   },
                                   {
                                       table: {
                                           headerRows: 1,
                                           body: tableBody
                                       }
                                   },
                                   {
                                       text: ' '
                                   },
                                   {
                                       image: base64Img
                                   }
                               ]
                           }
                       }

                       PdfMaker.createAndDownload(options);
                   });
            }

            this.editTrip = function (trip) {
                var startDate = new Date(trip.date);
                var endDate = new Date(trip.arrivalDate);

                that.isEditMode = true;
                that.trip = trip;
                that.trip.startDate = startDate;
                that.trip.startTime = startDate;
                that.trip.endDate = endDate;
                that.trip.endTime = endDate;
                that.showAddTripForm = true;
            };

            this.disableEditMode = function () {
                that.showAddTripForm = false;
                that.isEditMode = false;
                that.clearTripModel();
            }

            this.delete = function (trip) {
                var msg = 'Вы уверены, что хотите удалить маршрут ' + trip.cityFrom.Name + '---->' + trip.cityTo.Name + ', ' + trip.date + '?';
                if (confirm(msg)) {
                    Trip.remove({ id: trip.id },
                        function onSuccess(deletedTrip) {
                            var index = that.trips.map(function (e) { return e.id }).indexOf(deletedTrip.id);
                            if (index > -1) {
                                that.trips.splice(index, 1);
                            }
                        },
                        function onError(error) {
                            var errorMessage = 'Маршрут не удален. Ошибка удаления: ' + error.data.Message;
                            alert(errorMessage);
                        });
                }
            }

            this.addCompolsoryExpense = function (cost, comment) {
                if (cost && comment) {
                    that.trip.compulsoryExpenses.push({ Comment: comment, Cost: cost });

                    that.compulsoryNewCost = 0;
                    that.compulsoryNewComment = '';
                }
            }

            this.addUnexpectedExpens = function (cost, comment) {
                if (cost && comment) {
                    that.trip.unexpectedExpenses.push({ Comment: comment, Cost: cost });

                    that.unexpectedNewCost = 0;
                    that.unexpectedNewComment = '';
                }
            }

            this.getDriverCashbox = function (trip) {
                return tripCashService.countDriverCashBox(trip);
            }

            this.mapInitialized = function (map) {
                google.maps.event.trigger(map, 'resize');
                map.setZoom(5);
            }

            this.getTripWaypoints = function (clients, origin, destination) {
                var waypoints = [];

                var addToWaypoints = function (location) {
                    if (!waypoints.some((wp) => wp.location == location) && location != origin && location != destination) {
                        waypoints.push({ location: location, stopover: true });
                    }
                }

                clients.map(function (client) {
                    addToWaypoints(client.To);
                    addToWaypoints(client.From);
                });

                return waypoints;
            }

            $scope.$watchCollection('$ctrl.trip.tripClients', function (newValue, previousValue) {
                if (newValue && newValue.length > 0) {
                    $scope.form.$setValidity('isAnyClient', true);
                }
            });
        }]
});