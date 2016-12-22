'use strict';

angular.
    module('signIn').
    component('signIn',
    {
        templateUrl: 'authentication/signin/signin.template.html',
        controller: ['AuthService', '$location', function(authService, $location) {
            var that=this;

            if (!authService.authentication.isAuth) {
                authService.logOut();
                $location.path('/login');
            }

            this.loginData={
                email: "",
                password: ""
            };

            this.message="";

            this.login=function() {
                authService.login(this.loginData).then(function(response) {
                    $location.path('/clients');
                },
                function(err) {
                    that.message=err.data.error_description;
                });
            };
        }
    ]
});

