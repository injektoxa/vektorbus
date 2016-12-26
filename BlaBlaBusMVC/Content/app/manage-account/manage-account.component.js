'use strict';

angular.module('manageAccount').component('manageAccount', {
    templateUrl: 'manage-account/manage-account.template.html',
    controller: ['ManageAccountService', 'AuthService', function (manageAccountService, authService) {
        var that = this;

        var currentAuthData = authService.authData;
        this.accountData = {
            email: currentAuthData.email ? currentAuthData.email : "",
            name: currentAuthData.userName ? currentAuthData.userName : ""
        }

        this.message = "";
        this.updateSuccefull = null;

        this.update = function () {
            manageAccountService.updateAccount(this.accountData).then(function (response) {
                that.message = "Account has been successfully updated";
                that.updateSuccefull = true;
            }), function (response) {
                var errors = [];
                for (var key in response.data.ModelState) {
                    for (var i = 0; i < response.data.ModelState[key].length; i++) {
                        errors.push(response.data.ModelState[key][i]);
                    }
                }

                that.message = errors.join('\n');
                that.updateSuccefull = false;
            }
        }
    }
    ]
});