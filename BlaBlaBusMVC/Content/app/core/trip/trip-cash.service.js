'use strict';

const expenseSumFun = (acc, expense) => acc + expense.Cost;

angular.module('core.trip')
    .factory('tripCashService', function () {
        return {
            countIncomes: function (trip) {
                var expenses = this.countTotalExpenses(trip);
                var incomes = this.countDriverCashBox(trip);

                return incomes - (expenses.compolsuryTotal + expenses.unexpectedTotal + expenses.agentExpensesTotal);
            },
            countDriverCashBox: function (trip) {
                return trip.tripClients.reduce((acc, client) => acc + client.Price, 0);
            },
            countTotalExpenses: function (trip) {
                var compulsoryExpensesSum = trip.compulsoryExpenses.reduce(expenseSumFun, 0);
                var unexpectedExpensesSum = trip.unexpectedExpenses.reduce(expenseSumFun, 0);

                var agentExpensesSum = trip.tripClients.reduce((acc, client) => acc + client.AgentPrice, 0);

                return {
                    compolsuryTotal: compulsoryExpensesSum,
                    unexpectedTotal: unexpectedExpensesSum,
                    agentExpensesTotal: agentExpensesSum
                };
            }
        }
    });
