'use strict';

angular.
    module('navBar').
    component('navbar',
    {
        templateUrl: 'navbar/navbar.template.html',
        controller: ['AuthService', function (authService) {
            var that = this;

            this.ClientAccessRoles = ['Driver'];
            this.BusesAccessRoles = ['Driver', 'Partner'];

            this.updateAuthData = function () {
                that.isAuth = authService.authData.isAuth;
                that.currentRole = authService.authData.role;
            }

            authService.registerObserverCallback(that.updateAuthData);

            this.isAuth = authService.authData.isAuth;
            this.currentRole = authService.authData.role;

            this.hasRole = function (allowedRoles) {
                if (that.isAuth) {
                    if (!allowedRoles) {
                        return that.currentRole == 'Admin';
                    }

                    return allowedRoles.indexOf(that.currentRole) != -1 || that.currentRole == 'Admin';
                }

                return false;
            }
        }]
    });

