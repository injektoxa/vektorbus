'use strict';

angular.
  module('signUp').
  component('signUp', {
      templateUrl: 'authentication/signup/signup.template.html',
      controller: ['AuthService', '$location', function (authService, $location) {
          var that = this;

          this.savedSuccessfully = false;
          this.message = "";

          this.registration = {
              email: "",
              password: "",
              confirmPassword: ""
          };

          this.signUp = function (formValid) {
              if (Boolean(formValid)) {
                  authService.saveRegistration(this.registration).then(function (response) {
                      that.savedSuccessfully = true;
                      that.message = "User has been registered successfully, you will be redicted to login page in 2 seconds.";

                      $location.push('/login');
                  },
                  function (response) {
                      var errors = [];
                      for (var key in response.data.ModelState) {
                          for (var i = 0; i < response.data.ModelState[key].length; i++) {
                              errors.push(response.data.ModelState[key][i]);
                          }
                      }

                      that.message = errors.join('\n');
                  });
              }
          }
      }
      ]
  });
