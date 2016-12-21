'use strict';

// Register `modalClient` component, along with its associated controller and template
angular.
  module('modalClient').
  component('modalClient', {
    templateUrl: 'client-list/modal/modalClient-template.html',

    bindings: {
      resolve: '<',
      close: '&',
      dismiss: '&'
    },

    controller: function () {
      var that = this;

      that.$onInit = function () {
        that.client = that.resolve.client;
        if (that.client && that.client.Id > 0) {
          that.headerTitle = 'Редактирование';
        } else {
          that.headerTitle = 'Создание';
        }
      };

      that.ok = function () {
          that.close({ $value: that.client });
      };

      that.cancel = function () {
        that.dismiss({ $value: 'cancel' });
      };
    }
  });