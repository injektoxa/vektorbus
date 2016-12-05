'use strict';

// Register `reports` component, along with its associated controller and template
angular.module('reports')
    .component('reports',
    {
    	templateUrl: 'reports/reports.template.html',
        controller: [
            'Agent', 'Report', '$filter',
            function (Agent, Report, $filter) {
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

                that.onGetReports = function(reports) {
                    that.reports = reports;
                    that.reportTitle = 'Отчет по агенту ' + that.agent.FullName;
                    that.totalTitle = 'Итого за период с ' +
                        $filter('date')(that.dateFrom, "yyyy-MM-dd") +
                        ' по ' +
                        $filter('date')(that.dateTo, "yyyy-MM-dd") +
                        ': ';
                    that.totalPrice = reports.reduce(function(previousValue, currentValue) {
                        return previousValue.AgentCompensation + currentValue.AgentCompensation;
                    });
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

                    Report.query(options, that.onGetReports);
                };
            }
        ]
    });