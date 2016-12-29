'use strict';

// Register `reports` component, along with its associated controller and template
angular.module('reports')
    .component('driverReports',
    {
        templateUrl: 'Content/app/reports/driver-reports.template.html',
        controller: [
            'Driver', 'DriverReport', '$filter', 'PdfMaker',
            function (Driver, DriverReport, $filter, pdfMaker) {
            	var that = this;
		
            	that.drivers = Driver.query();
            	that.driver = {};
                that.dateTimeFormat = "dd/MM/yyyy";
            	that.dateFrom = new Date();
            	that.dateTo = new Date();
            	that.dateOptions = {
            		showWeeks: false,
            		startingDay: 0,
            		maxDate: new Date()
            	}
            	that.reports = [];
                that.reportTitle = '';
                that.totalTitle = '';
                that.totalPrice = '';
                that.reportIsShowing = false;

                that.startDatePopup = {
                    opened: false
                };
                that.startDateOpen = function () {
                    that.startDatePopup.opened = true;
                };

                that.endDatePopup = {
                    opened: false
                };
                that.endDateOpen = function () {
                    that.endDatePopup.opened = true;
                };

                that.onGetReports = function(reports) {
                    that.reports = reports;
                    that.reportTitle = 'Отчет по водителю ' + that.driver.FullName;
                    that.totalTitle = 'Итого за период с ' +
                        $filter('date')(that.dateFrom, "yyyy-MM-dd") +
                        ' по ' +
                        $filter('date')(that.dateTo, "yyyy-MM-dd") +
                        ': ';

                    that.totalPrice = 0;
                    that.reportIsShowing = true;
                    for (var i = 0; i < reports.length; i++) {
                        that.totalPrice += reports[i].CompulsoryExpenses;
                        if (reports[i].UnexpectedExpenses != null) {
                            that.totalPrice += reports[i].UnexpectedExpenses;
                        }
                    }
                };

                that.createReport = function () {
                    that.reportTitle = '';
                    that.totalTitle = '';
                    that.totalPrice = '';
                    that.reportIsShowing = false;

                    var options = {
                        id: that.driver.Id,
                        dateFrom: $filter('date')(that.dateFrom, "yyyy-MM-dd"),
                        dateTo: $filter('date')(that.dateTo, "yyyy-MM-dd")
                    };

                    DriverReport.query(options, that.onGetReports);
                };

                that.createPDF = function (reports) {
                    var tableBody = [[
                        { text: 'Дата Отправления', style: 'tableHeader' },
                        { text: 'Откуда', style: 'tableHeader' },
                        { text: 'Куда', style: 'tableHeader' },
                        { text: 'Автобус', style: 'tableHeader' },
                        { text: 'Кол-во пассажиров', style: 'tableHeader' },
                        { text: 'Постоянные расходы', style: 'tableHeader' },
                        { text: 'Непредвиденные расходы', style: 'tableHeader' }]];

                    reports.map((report) => tableBody.push([
                        report.TripDate,
                        report.CityFrom,
                        report.CityTo,
                        report.BusInfo,
                        report.ClientsCount ? report.ClientsCount.toString() : '',
                        report.CompulsoryExpenses ? report.CompulsoryExpenses.toString() : '',
                        report.UnexpectedExpenses ? report.UnexpectedExpenses.toString() : '']));

                    var datePeriod = $filter('date')(that.dateFrom, "yyyy-MM-dd").
                        concat(' - ', $filter('date')(that.dateTo, "yyyy-MM-dd"));

                    var options = {
                        fileName: 'Oтчет ' + datePeriod + ' ' + that.driver.FullName,
                        docDefinition: {
                            pageOrientation: 'portrait',
                            fontSize: 12,
                            content: [
                                {
                                    text: 'Водитель: ' + that.driver.FullName
                                },
                                {
                                    text: 'Oтчет за период: ' + datePeriod
                                },
                                {
                                    text: ' '
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
                                    text: that.totalTitle + ' ' + that.totalPrice
                                }
                            ]
                        }
                    }

                    pdfMaker.createAndDownload(options);
                }
            }
        ]
    });