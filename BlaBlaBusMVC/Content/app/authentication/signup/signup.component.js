'use strict';

angular.
  module('signUp').
  component('signUp', {
      templateUrl: 'authentication/signup/signup.template.html',
      controller: ['AuthService', function SignUpController(authService) {
          var that = this;

          this.savedSuccessfully = false;
          this.message = "";

          this.registration = {
              userName: "",
              password: "",
              confirmPassword: ""
          };

          this.signUp = function () {
              authService.saveRegistration(this.registration).then(function (response) {
                  that.savedSuccessfully = true;
                  that.message = "User has been registered successfully, you will be redicted to login page in 2 seconds.";
                  window.locaton.href('/login');
              },
              function (response) {
                  var errors = [];
                  for (var key in response.data.modelState) {
                      for (var i = 0; i < response.data.modelState[key].length; i++) {
                          errors.push(response.data.modelState[key][i]);
                      }
                  }
                  this.message = "Failed to register user due to:" + errors.join(' ');
              });
          }
      }
    ]
  });
