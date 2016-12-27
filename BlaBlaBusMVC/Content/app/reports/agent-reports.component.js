'use strict';

// Register `reports` component, along with its associated controller and template
angular.module('reports')
    .component('agentReports',
    {
        templateUrl: 'Content/app/reports/agent-reports.template.html',
        controller: [
            'Agent', 'AgentReport', '$filter', 'PdfMaker',
            function (Agent, AgentReport, $filter, pdfMaker) {
                var that = this;

                that.agents = Agent.query();
                that.agent = {};
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

                that.onGetReports = function (reports) {
                    that.reports = reports;
                    that.reportTitle = 'Отчет по агенту ' + that.agent.FullName;
                    that.totalTitle = 'Итого за период с ' +
                        $filter('date')(that.dateFrom, "yyyy-MM-dd") +
                        ' по ' +
                        $filter('date')(that.dateTo, "yyyy-MM-dd") +
                        ': ';
                    that.totalPrice = 0;
                    that.reportIsShowing = true;

                    for (var i = 0; i < reports.length; i++) {
                        that.totalPrice += reports[i].AgentCompensation;
                    }
                };

                that.createReport = function () {
                    that.reportTitle = '';
                    that.totalTitle = '';
                    that.totalPrice = '';

                    var options = {
                        id: that.agent.Id,
                        dateFrom: $filter('date')(that.dateFrom, "yyyy-MM-dd"),
                        dateTo: $filter('date')(that.dateTo, "yyyy-MM-dd")
                    };

                    AgentReport.query(options, that.onGetReports);
                };

                that.createPDF = function (reports) {
                    var tableBody = [[
                        { text: 'Дата Отправления', style: 'tableHeader' },
                        { text: 'Откуда', style: 'tableHeader' },
                        { text: 'Куда', style: 'tableHeader' },
                        { text: 'Автобус', style: 'tableHeader' },
                        { text: 'Водитель', style: 'tableHeader' },
                        { text: 'Кол-во пассажиров', style: 'tableHeader' },
                        { text: 'Компенсация за рейс', style: 'tableHeader' }]];

                    reports.map((report) => tableBody.push([
                        report.TripDate,
                        report.CityFrom,
                        report.CityTo,
                        report.BusInfo,
                        report.DriverInfo,
                        report.ClientsCount.toString(),
                        report.AgentCompensation.toString()]));

                    var datePeriod = $filter('date')(that.dateFrom, "yyyy-MM-dd").
                        concat(' - ', $filter('date')(that.dateTo, "yyyy-MM-dd"));

                    var options = {
                        fileName: 'Oтчет ' + datePeriod + ' ' + that.agent.FullName,
                        docDefinition: {
                            pageOrientation: 'portrait',
                            fontSize: 12,
                            content: [
                                {
                                    text: 'Агент: ' + that.agent.FullName
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