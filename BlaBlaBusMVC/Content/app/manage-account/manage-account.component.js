﻿'use strict';

angular.module('manageAccount').component('manageAccount', {
    templateUrl: 'Content/app/manage-account/manage-account.template.html',
    controller: ['ManageAccountService', 'AuthService', function (manageAccountService, authService) {
        var that = this;

        this.message = "";
        this.updateSuccefull = null;
        this.accountData = {};

        manageAccountService.getAccountInfo().then(function (response) {
            that.accountData.email = response.Email;
            that.accountData.name = response.Name;
        });

        this.update = function (formValid) {
            if (formValid) {
                manageAccountService.updateAccount(this.accountData)
                    .then(function () {
                        that.message = "Account has been successfully updated";
                        that.updateSuccefull = true;

                        authService.UpdateAuthData(that.accountData.email, that.accounData.name);
                    },
                    function (response) {
                        var errors = [];
                        for (var key in response.data.ModelState) {
                            for (var i = 0; i < response.data.ModelState[key].length; i++) {
                                errors.push(response.data.ModelState[key][i]);
                            }
                        }

                        that.message = errors.join('\n');
                        that.updateSuccefull = false;
                    });
            }
        }
    }]
});