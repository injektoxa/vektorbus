'use strict';

// Register `reports` component, along with its associated controller and template
angular.module('reports')
    .component('agentReports',
    {
    	templateUrl: 'reports/agent-reports.template.html',
        controller: [
            'Agent', 'AgentReport', '$filter',
            function (Agent, AgentReport, $filter) {
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
                    that.reportTitle = 'Отчет по агенту ' + that.agent.FullName;
                    that.totalTitle = 'Итого за период с ' +
                        $filter('date')(that.dateFrom, "yyyy-MM-dd") +
                        ' по ' +
                        $filter('date')(that.dateTo, "yyyy-MM-dd") +
                        ': ';
                    that.totalPrice = 0;
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
            }
        ]
    });