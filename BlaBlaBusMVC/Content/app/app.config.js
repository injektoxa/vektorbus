'use strict';

angular.
    module('VektorApp')
    .constant('authConstants',
    {
        ClientAccessRoles: ['Driver'],
        BussesAccessRoles: ['Driver', 'Partner'],
        AllRoles: ['User', 'Driver', 'Partner']
    })
    .config(['$locationProvider', '$routeProvider', 'authConstants', '$httpProvider', '$qProvider',
        function config($locationProvider, $routeProvider, authConstants, $httpProvider, $qProvider) {

            $httpProvider.interceptors.push('authInterceptorService');
            $locationProvider.html5Mode(true);
            $qProvider.errorOnUnhandledRejections(false);

            $routeProvider.
                when('/clients',
                {
                    template: '<client-list></client-list>',
                    acceptedRoles: authConstants.ClientAccessRoles
                }).
                when('/clients/:clientId',
                {
                    template: '<client-detail></client-detail>'
                }).
                when('/trips',
                {
                    template: '<trip-list></trip-list>',
                    acceptedRoles: authConstants.AllRoles
                }).
                when('/buses',
                {
                    template: '<bus-list></bus-list>',
                    acceptedRoles: authConstants.BussesAccessRoles
                }).
                when('/cities',
                {
                    template: '<cities-list></cities-list>'
                }).
                when('/signup',
                {
                    template: '<sign-up></sign-up>',
                    allowAnonymus: true
                }).
                when('/login',
                {
                    template: '<sign-in></sign-in>',
                    allowAnonymus: true
                }).
                when('/agents',
                {
                    template: '<agent-list></agent-list>'
                }).
                when('/agentReports',
                {
                    template: '<agent-reports></agent-reports>'
                }).
                when('/driverReports',
                {
                    template: '<driver-reports></driver-reports>'
                }).
                when('/access-forbidden',
                {
                    templateUrl: 'Content/app/access-forbidden.html',
                    allowAnonymus: true
                }).
                when('/manageAccount',
                {
                    template: '<manage-account></manage-account>',
                    acceptedRoles: authConstants.AllRoles
                }).
                otherwise('/trips');
        }
    ]).run(['$rootScope', '$location', 'AuthService',
        function ($rootScope, $location, authService) {
            $rootScope.$on('$routeChangeStart',
                function (event, next) {
                    var currentRole = authService.authData.role; 
                    next.acceptedRoles = next.acceptedRoles ? next.acceptedRoles : [];

                    //if current user is not authenticated or his role is not accepted to view particular route
                    if (next.allowAnonymus) {
                        return true;
                    }

                    if (currentRole != "Admin" && next.acceptedRoles.indexOf(currentRole) == -1) {
                        if (!authService.authData.isAuth) {
                            $location.path('/login');
                        } else {
                            $location.path('/access-forbidden');
                        }
                    }

                    return true;
                });
            }
    ]);