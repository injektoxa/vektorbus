angular.module('core.trip')
    .factory('tripCashService', function () {
        return {
            countDriverCashBox: function (trip) {
                var expenseSumFun = (acc, expense) => acc + expense.Cost;

                var compulsoryExpensesSum = trip.compulsoryExpenses.reduce(expenseSumFun, 0);
                var unexpectedExpensesSum = trip.unexpectedExpenses.reduce(expenseSumFun, 0);

                var incomes = trip.tripClients.reduce((acc, client) => acc + client.Price, 0);

                return incomes - (compulsoryExpensesSum + unexpectedExpensesSum);
            }
        }
    });
