'use strict';

// Register `modalClient` component, along with its associated controller and template
angular.
  module('modalClient').
  component('modalClient', {
      templateUrl: 'Content/app/client-list/modal/modalClient-template.html',

      bindings: {
          resolve: '<',
          close: '&',
          dismiss: '&'
      },

      controller: ['Client', function (Client) {
          var that = this;

          that.message = '';
          that.$onInit = function () {
              that.client = that.resolve.client;
              if (that.client && that.client.Id > 0) {
                  that.headerTitle = 'Редактирование';
              } else {
                  that.headerTitle = 'Создание';
              }
          };

          that.ok = function () {
              Client.add(that.client,
                  function onSuccess(createdClient) {
                      that.close({ $value: createdClient });
                  },
                  function onError(response) {
                      var errors = [];
                      for (var key in response.data.ModelState) {
                          for (var i = 0; i < response.data.ModelState[key].length; i++) {
                              errors.push(response.data.ModelState[key][i]);
                          }
                      }

                      that.message = errors.join(' ');
                  });
          };

          that.cancel = function () {
              that.dismiss({ $value: 'cancel' });
          };
      }]
  });