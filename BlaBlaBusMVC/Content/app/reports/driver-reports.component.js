﻿'use strict';

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
                that.DriverReports = {};
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

                that.onGetReports = function (reports) {
                    reports.map(function (report) {
                        that.DriverReports[report.DriverName]
                            ? that.DriverReports[report.DriverName].push(report)
                            : that.DriverReports[report.DriverName] = [report];
                    });

                    that.totalTitle = 'Итого за период с ' +
                        $filter('date')(that.dateFrom, "yyyy-MM-dd") + ' по ' +
                        $filter('date')(that.dateTo, "yyyy-MM-dd") + ': ';

                    that.totalIncomes = that.getTotalIncomes(reports);
                    that.isMultipleDriversMode = Object.keys(that.DriverReports).length > 1;
                    that.reportIsShowing = true;
                };

                that.createReport = function () {
                    that.DriverReports = {};
                    that.reportTitle = '';
                    that.totalTitle = '';
                    that.totalPrice = '';
                    that.reportIsShowing = false;

                    var options = {
                        id: that.driver ? that.driver.Id : null,
                        dateFrom: $filter('date')(that.dateFrom, "yyyy-MM-dd"),
                        dateTo: $filter('date')(that.dateTo, "yyyy-MM-dd")
                    };

                    DriverReport.query(options, that.onGetReports);
                };

                //reports : particular DriverReports for driver or null if calculate total incomes for all drivers
                that.getTotalIncomes = function (reports) {
                    const totalIncomes = reports.reduce((acc, report) => acc + report.TotalIncomes, 0);

                    return totalIncomes;
                }

                that.createPDF = function (reports) {
                    var tableBody = [[
                        { text: 'Дата Отправления', style: 'tableHeader' },
                        { text: 'Откуда', style: 'tableHeader' },
                        { text: 'Куда', style: 'tableHeader' },
                        { text: 'Автобус', style: 'tableHeader' },
                        { text: 'Кол-во пассажиров', style: 'tableHeader' },
                        { text: 'Постоянные расходы', style: 'tableHeader' },
                        { text: 'Непред. расходы', style: 'tableHeader' },
                        { text: 'Касса', style: 'tableHeader' }]];

                    reports.map((report) => tableBody.push([
                        report.TripDate,
                        report.CityFrom,
                        report.CityTo,
                        report.BusInfo,
                        report.ClientsCount ? report.ClientsCount.toString() : '',
                        report.CompulsoryExpenses ? report.CompulsoryExpenses.toString() : 0,
                        report.UnexpectedExpenses ? report.UnexpectedExpenses.toString() : 0,
                        report.DriverCashBox ? report.DriverCashBox.toString() : 0]));

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