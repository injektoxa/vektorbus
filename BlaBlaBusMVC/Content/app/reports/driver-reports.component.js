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

                 that.getReportsPdfTable = function (reports, driverName) {
                     var title = [
                         { text: 'Водитель: ' + driverName }];

                     var table = [[
                         { text: 'Дата Отправления' },
                         { text: 'Откуда' },
                         { text: 'Куда' },
                         { text: 'Автобус' },
                         { text: 'Кол-во пас.' },
                         { text: 'Постоянные расходы' },
                         { text: 'Непред. расходы' },
                         { text: 'Касса' },
                         { text: 'Доход' }]];

                     reports.map((report) => table.push([
                           report.TripDate,
                           report.CityFrom,
                           report.CityTo,
                           report.BusInfo,
                           report.ClientsCount ? report.ClientsCount.toString() : '',
                           report.CompulsoryExpenses ? report.CompulsoryExpenses.toString() : '0',
                           report.UnexpectedExpenses ? report.UnexpectedExpenses.toString() : '0',
                           report.DriverCashBox ? report.DriverCashBox.toString() : '0',
                           report.TotalIncomes ? report.TotalIncomes.toString() : '0']));

                     title.push(
                         { table: { body: table } },
                         { text: ' ' },
                         { text: 'Итого: ' + that.getTotalIncomes(reports) },
                         { text: ' ' });

                     return title;
                 }

                 that.createPDF = function (driverName) {
                     const datePeriod = $filter('date')(that.dateFrom, that.dateTimeFormat).
                        concat(' - ', $filter('date')(that.dateTo, that.dateTimeFormat));

                     var content = [{ text: 'Oтчет за период: ' + datePeriod }, { text: ' ' }];

                     function generateReport(driversName) {
                         var report = that.getReportsPdfTable(that.DriverReports[driversName], driversName);

                         content = content.concat(report);
                     }

                     if (driverName) {
                         generateReport(driverName);
                     } else {
                         Object.keys(that.DriverReports).map((driversName) => generateReport(driversName));
                     }

                     if (!driverName) {
                         content.push(
                             { text: ' ' },
                             { text: 'Итого по всем водителям за период ' + datePeriod + ' : ' + that.totalIncomes });
                     }

                     const driverFileNaming = driverName ? driverName : 'по всем водителям';
                     var options = {
                         fileName: 'Oтчет ' + datePeriod + ' ' + driverFileNaming,
                         docDefinition: {
                             pageOrientation: 'portrait',
                             fontSize: 12,
                             content: content
                         }
                     }

                     pdfMaker.createAndDownload(options);
                 }
             }
        ]
    });